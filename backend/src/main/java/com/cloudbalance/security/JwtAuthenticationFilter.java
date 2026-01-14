//package com.cloudbalance.security;
//
//import com.cloudbalance.utils.JwtUtils;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.Cookie;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import java.io.IOException;
//
//@Component
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//
//    @Autowired
//    private JwtUtils jwtUtils;
//
//    @Autowired
//    private UserDetailsService customUserDetailsService;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//
//        String path = request.getRequestURI();
//
//        if (path.startsWith("/diagnostic") || path.startsWith("/auth/")) {
//            System.out.println("  Skipping JWT filter for public endpoint: " + path);
//            chain.doFilter(request, response);
//            return;
//        }
//
//        String token = null;
//        String username = null;
//
//        System.out.println("=== JWT FILTER START ===");
//        System.out.println("Request path: " + path);
//
//        String header = request.getHeader("Authorization");
//        System.out.println("Auth header: " + header);
//
//        if (header != null && header.startsWith("Bearer ")) {
//            token = header.substring(7);
//            System.out.println("Token from header: " + token);
//        } else {
//            System.out.println(" No Bearer token found");
//            chain.doFilter(request, response);
//            return;
//        }
//
//
//        try {
//            username = jwtUtils.extractUsername(token);
//        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
//            // Token expired → frontend will refresh
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        } catch (Exception ex) {
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//            return;
//        }
//
//        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
//
//            if (jwtUtils.validateToken(token)) {
//                UsernamePasswordAuthenticationToken authToken =
//                        new UsernamePasswordAuthenticationToken(
//                                userDetails,
//                                null,
//                                userDetails.getAuthorities()
//                        );
//
//                SecurityContextHolder.getContext().setAuthentication(authToken);
//
//                System.out.println(" AUTHENTICATION SUCCESS FOR USER → " + username);
//            } else {
//                System.out.println(" Token validation failed");
//            }
//        }
//
//        System.out.println("=== JWT FILTER END ===");
//        chain.doFilter(request, response);
//    }
//}

package com.cloudbalance.security;

import com.cloudbalance.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService) {
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        return path.startsWith("/diagnostic") || path.startsWith("/auth/");
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain chain
    ) throws ServletException, IOException {

        String path = request.getRequestURI();

        String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            // No JWT provided -> continue, SecurityConfig rules will decide
            chain.doFilter(request, response);
            return;
        }

        String token = header.substring(7);
        String username;

        try {
            username = jwtUtils.extractUsername(token);
        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
            log.debug("JWT expired for path={}", path);
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        } catch (Exception ex) {

            log.debug("JWT invalid for path={} reason={}", path, ex.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtils.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);
                log.debug("JWT auth success user={} path={}", username, path);
            } else {
                log.debug("JWT validation failed user={} path={}", username, path);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        }

        chain.doFilter(request, response);
    }
}
