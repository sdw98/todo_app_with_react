package com.sdw.backend.controller;

import com.sdw.backend.dto.TodoDto;
import com.sdw.backend.dto.TodoResponseDto;
import com.sdw.backend.dto.TodoStatsDto;
import com.sdw.backend.dto.TodoUpdateDto;
import com.sdw.backend.service.TodoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<TodoResponseDto>> getAllTodos(
            @RequestParam(required = false) Boolean completed,
            @RequestParam(required = false) String search
    ) {
        List<TodoResponseDto> todos;

        if (search != null && !search.trim().isEmpty()) {
            todos = todoService.searchTodosByTitle(search);
        } else if (completed != null) {
            todos = todoService.getTodosByCompleted(completed);
        } else {
            todos = todoService.getAllTodos();
        }

        return ResponseEntity.ok(todos);
    }

    @GetMapping("/page")
    public ResponseEntity<Page<TodoResponseDto>> getAllTodosPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue =  "desc") String sortDir
    ) {
        Sort sort = sortDir.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);
        Page<TodoResponseDto> todos = todoService.getAllTodos(pageable);

        return ResponseEntity.ok(todos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoResponseDto> getTodoById(@PathVariable Long id) {
        TodoResponseDto todo = todoService.getTodoById(id);
        return ResponseEntity.ok(todo);
    }

    @PostMapping
    public ResponseEntity<TodoResponseDto> createTodo(@Valid @RequestBody TodoDto dto) {
        TodoResponseDto createTodo = todoService.createTodo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createTodo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoResponseDto> updateTodo(
            @PathVariable Long id,
            @Valid @RequestBody TodoUpdateDto dto
    ) {
        TodoResponseDto updatedTodo = todoService.updateTodo(id, dto);
        return ResponseEntity.ok(updatedTodo);
    }

    @PatchMapping("/{id}/toggle")
    public ResponseEntity<TodoResponseDto> toggleTodoCompleted(@PathVariable Long id) {
        TodoResponseDto updatedTodo = todoService.toggleTodoCompleted(id);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id)
    {
        todoService.deleteTodo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/stats")
    public ResponseEntity<TodoStatsDto> getStats() {
        TodoStatsDto stats = todoService.getStats();
        return ResponseEntity.ok(stats);
    }
}