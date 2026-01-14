////package com.cloudbalance.exception;
////
////import org.springframework.http.HttpStatus;
////import org.springframework.http.ResponseEntity;
////import org.springframework.security.access.AccessDeniedException;
////import org.springframework.security.authentication.BadCredentialsException;
////import org.springframework.security.authentication.DisabledException;
////import org.springframework.security.core.userdetails.UsernameNotFoundException;
////import org.springframework.web.bind.MethodArgumentNotValidException;
////import org.springframework.web.bind.annotation.ExceptionHandler;
////import org.springframework.web.bind.annotation.RestControllerAdvice;
////
////import java.time.Instant;
////import java.util.HashMap;
////import java.util.Map;
////
////@RestControllerAdvice
////public class GlobalExceptionHandler {
////
////    // ---------- AUTH / SECURITY ----------
////
////    @ExceptionHandler(BadCredentialsException.class)
////    public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex) {
////        return build(HttpStatus.UNAUTHORIZED, "Invalid email or password");
////    }
////
////    @ExceptionHandler(UsernameNotFoundException.class)
////    public ResponseEntity<?> handleUserNotFound(UsernameNotFoundException ex) {
////        return build(HttpStatus.UNAUTHORIZED, "User not found");
////    }
////
////    @ExceptionHandler(DisabledException.class)
////    public ResponseEntity<?> handleDisabledUser(DisabledException ex) {
////        return build(HttpStatus.UNAUTHORIZED, "User is inactive");
////    }
////
////    @ExceptionHandler(AccessDeniedException.class)
////    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
////        return build(HttpStatus.FORBIDDEN, "Access denied");
////    }
////
////    // ---------- VALIDATION ----------
////
////    @ExceptionHandler(MethodArgumentNotValidException.class)
////    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
////        Map<String, String> errors = new HashMap<>();
////        ex.getBindingResult().getFieldErrors()
////                .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
////
////        return ResponseEntity
////                .status(HttpStatus.BAD_REQUEST)
////                .body(Map.of(
////                        "status", 400,
////                        "errors", errors,
////                        "timestamp", Instant.now()
////                ));
////    }
////
////    // ---------- FALLBACK ----------
////
////    @ExceptionHandler(Exception.class)
////    public ResponseEntity<?> handleGeneric(Exception ex) {
////        ex.printStackTrace(); // logging
////        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
////    }
////
////    // ---------- COMMON RESPONSE ----------
////
////    private ResponseEntity<?> build(HttpStatus status, String message) {
////        return ResponseEntity.status(status).body(
////                Map.of(
////                        "status", status.value(),
////                        "message", message,
////                        "timestamp", Instant.now()
////                )
////        );
////    }
////}
//
//package com.cloudbalance.exception;
//
//import org.springframework.dao.DataIntegrityViolationException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.authentication.CredentialsExpiredException;
//import org.springframework.security.authentication.DisabledException;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.web.bind.MethodArgumentNotValidException;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//import org.springframework.web.bind.annotation.RestControllerAdvice;
//
//import java.time.Instant;
//import java.util.HashMap;
//import java.util.Map;
//
//@RestControllerAdvice
//public class GlobalExceptionHandler {
//
//    // ---------- AUTH / SECURITY ----------
//
//    @ExceptionHandler(BadCredentialsException.class)
//    public ResponseEntity<?> handleBadCredentials() {
//        return build(HttpStatus.UNAUTHORIZED, "Invalid email or password");
//    }
//
//    @ExceptionHandler(UsernameNotFoundException.class)
//    public ResponseEntity<?> handleUserNotFound() {
//        return build(HttpStatus.NOT_FOUND, "User not found");
//    }
//
//    @ExceptionHandler(DisabledException.class)
//    public ResponseEntity<?> handleDisabledUser() {
//        return build(HttpStatus.UNAUTHORIZED, "User is inactive");
//    }
//
//    @ExceptionHandler(CredentialsExpiredException.class)
//    public ResponseEntity<?> handleTokenExpired() {
//        return build(HttpStatus.UNAUTHORIZED, "Token expired");
//    }
//
//    @ExceptionHandler(AccessDeniedException.class)
//    public ResponseEntity<?> handleAccessDenied() {
//        return build(HttpStatus.FORBIDDEN, "Access denied");
//    }
//
//    // ---------- DATA / DB ----------
//
//    @ExceptionHandler(DataIntegrityViolationException.class)
//    public ResponseEntity<?> handleDuplicateData(DataIntegrityViolationException ex) {
//        return build(HttpStatus.CONFLICT, ex.getMessage());
//    }
//
//    // ---------- VALIDATION ----------
//
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
//
//        Map<String, String> errors = new HashMap<>();
//        ex.getBindingResult()
//                .getFieldErrors()
//                .forEach(err ->
//                        errors.put(err.getField(), err.getDefaultMessage())
//                );
//
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
//                Map.of(
//                        "status", 400,
//                        "errors", errors,
//                        "timestamp", Instant.now()
//                )
//        );
//    }
//
//    // ---------- FALLBACK ----------
//
//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<?> handleGeneric(Exception ex) {
//        ex.printStackTrace(); // replace with logger later
//        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
//    }
//
//    // ---------- COMMON RESPONSE ----------
//
//    private ResponseEntity<?> build(HttpStatus status, String message) {
//        return ResponseEntity.status(status).body(
//                Map.of(
//                        "status", status.value(),
//                        "message", message,
//                        "timestamp", Instant.now()
//                )
//        );
//    }
//}

package com.cloudbalance.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // ---------- AUTH / SECURITY ----------

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex) {
        return build(HttpStatus.UNAUTHORIZED, "Invalid email or password");
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<?> handleUserNotFound(UsernameNotFoundException ex) {
        return build(HttpStatus.NOT_FOUND, "User not found");
    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<?> handleDisabledUser(DisabledException ex) {
        return build(HttpStatus.UNAUTHORIZED, "User is inactive");
    }

    @ExceptionHandler(CredentialsExpiredException.class)
    public ResponseEntity<?> handleTokenExpired(CredentialsExpiredException ex) {
        return build(HttpStatus.UNAUTHORIZED, "Token expired");
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<?> handleAccessDenied(AccessDeniedException ex) {
        return build(HttpStatus.FORBIDDEN, "Access denied");
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArg(IllegalArgumentException ex) {
        return build(HttpStatus.BAD_REQUEST, ex.getMessage());
    }

    // ---------- DATA / DB ----------

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDuplicateData(DataIntegrityViolationException ex) {
        String msg = ex.getMessage();
        if (msg == null || msg.length() > 160) {
            msg = "Duplicate or invalid data";
        }
        return build(HttpStatus.CONFLICT, msg);
    }

    // ---------- VALIDATION ----------

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {

        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                Map.of(
                        "status", 400,
                        "message", "Validation failed",
                        "errors", errors,
                        "timestamp", Instant.now()
                )
        );
    }

    // ---------- FALLBACK ----------

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGeneric(Exception ex) {
        log.error("Unhandled exception", ex);
        return build(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");
    }

    // ---------- COMMON RESPONSE ----------

    private ResponseEntity<?> build(HttpStatus status, String message) {
        return ResponseEntity.status(status).body(
                Map.of(
                        "status", status.value(),
                        "message", message,
                        "timestamp", Instant.now()
                )
        );
    }
}
