package com.sweet.home.comment.controller;

import com.sweet.home.comment.service.CommentLikeService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
public class CommentLikeRestController {

    private final CommentLikeService commentLikeService;

    public CommentLikeRestController(CommentLikeService commentLikeService) {
        this.commentLikeService = commentLikeService;
    }

    @PostMapping("/{commentId}/likes")
    public ResponseEntity<Void> likeComment(@AuthenticationPrincipal String email, @PathVariable Long commentId) {
        commentLikeService.likeComment(email, commentId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{commentId}/likes")
    public ResponseEntity<Void> deleteLike(@AuthenticationPrincipal String email, @PathVariable Long commentId) {
        commentLikeService.deleteLike(email, commentId);
        return ResponseEntity.noContent().build();
    }
}