package com.cloudbalance.security;

import com.cloudbalance.utils.JwtUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.startsWith("/diagnostic") || path.startsWith("/auth/")) {
            System.out.println("  Skipping JWT filter for public endpoint: " + path);
            chain.doFilter(request, response);
            return;
        }

        String token = null;
        String username = null;

        System.out.println("=== JWT FILTER START ===");
        System.out.println("Request path: " + path);

        String header = request.getHeader("Authorization");
        System.out.println("Auth header: " + header);

        if (header != null && header.startsWith("Bearer ")) {
            token = header.substring(7);
            System.out.println("Token from header: " + token);
        } else {
            System.out.println(" No Bearer token found");
            chain.doFilter(request, response);
            return;
        }

//        try {
//            username = jwtUtils.extractUsername(token);
//            System.out.println("Username from token: " + username);
//        } catch (Exception e) {
//            System.out.println("INVALID TOKEN: " + e.getMessage());
//            e.printStackTrace();
//            chain.doFilter(request, response);
//            return;
//        }

        try {
            username = jwtUtils.extractUsername(token);
        } catch (io.jsonwebtoken.ExpiredJwtException ex) {
            // Token expired → frontend will refresh
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        } catch (Exception ex) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

            if (jwtUtils.validateToken(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println(" AUTHENTICATION SUCCESS FOR USER → " + username);
            } else {
                System.out.println(" Token validation failed");
            }
        }

        System.out.println("=== JWT FILTER END ===");
        chain.doFilter(request, response);
    }
}