package com.demo.model;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity
@Data
public class Task {
 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Long id;
 
 private String title;
 private String description;
 private LocalDate dueDate;
 private boolean completed;
 
 // getters and setters
}
