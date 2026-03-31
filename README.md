# Student Productivity Portal

This project is a web-based application designed to help students manage their academic activities in a structured and efficient way. It brings together multiple tools such as planning, tracking, and performance analysis into a single platform.

---

## Features

### Day Planner

Allows users to organize daily tasks and schedules.

### Timetable Management

Stores class schedules and integrates them into the daily overview.

### Task Tracker

Helps manage tasks with deadlines and track completion.

### Study Timer

Provides a simple timer for focused study sessions.

### Attendance Tracker

* Records subject-wise attendance
* Calculates overall attendance percentage
* Indicates status based on thresholds
* Predicts whether attendance is safe or at risk
* Suggests how many classes are needed to reach minimum requirements

### Performance Predictor

A rule-based prediction system that estimates academic performance based on:

* Study hours
* Study consistency
* Sleep
* Assignment completion
* Attendance

The output is supported by:

* A circular performance meter
* A graphical representation of input factors
* Suggestions for improvement

### Mood Tracker

Tracks daily mood patterns.

### Habit Tracker

Encourages consistency by tracking habits.

### Affirmation Corner

Displays motivational content for users.

### Study Workspace

An interactive canvas-based workspace that allows:

* Freehand drawing
* Creating diagrams (shapes and arrows)
* Drawing tables
* Adding text
* Saving work as an image

---

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Python (Flask)
* Libraries:

  * Chart.js for data visualization
  * Canvas API for drawing functionality

---

## Setup Instructions

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install flask flask-cors
python app.py
```

### Frontend

Open the project in VS Code and run `index.html` using Live Server.

---

## Notes

* The frontend should be opened using a local server (not file://)
* The backend must be running for the performance predictor to work
* Data is stored locally using browser storage

---

## Future Improvements

* Improved analytics and visualizations
* Notification and reminder system
* Integration with a database
* Enhanced mobile responsiveness

---

## Author

Khushi Kumar
