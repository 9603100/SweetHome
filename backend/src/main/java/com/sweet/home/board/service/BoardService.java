package com.sweet.home.board.service;

import com.sweet.home.board.controller.dto.request.BoardSaveRequest;
import com.sweet.home.board.controller.dto.response.BoardResponse;
import com.sweet.home.board.domain.Board;
import com.sweet.home.board.domain.BoardRepository;
import com.sweet.home.global.exception.BusinessException;
import com.sweet.home.global.exception.ErrorCode;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Transactional
    public List<BoardResponse> findAllBoards() {
        return boardRepository.findAll().stream()
            .map(BoardResponse::from)
            .collect(Collectors.toList());
    }

    @Transactional
    public void saveBoard(BoardSaveRequest request) {
        Board board = Board.builder()
            .name(request.getName())
            .description(request.getDescription())
            .build();
        boardRepository.save(board);
    }

    @Transactional
    public Board findById(Long boardId) {
        return boardRepository.findById(boardId)
            .orElseThrow(() -> new BusinessException(ErrorCode.BOARD_NOT_FOUND_BY_ID));
    }
}
