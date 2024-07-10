---
title: Resume Wizard
description: Web application that guides users through creating professional resumes utilizing React
date: Jun 20 2024
demoURL: "https://resume-wizard-six.vercel.app/"
repoURL: "https://github.com/josephdanielm/resume-wizard"
---

<a href="https://resume-wizard-six.vercel.app/" target="_blank"><img alt="Resume Wizard Screenshot" src="/resume-wizard-screenshot.png" /></a>

## Overview

**Resume Wizard** is my first substantial project built with React. The primary objective was to practice and enhance my skills with this shiny new framework.

It's a clean and minimal app that helps users build their resumes step-by-step, then generates a PDF they can download.

## Key Features

- **User-Friendly Interface:** A simple, wizard-style setup that collects user information one section at a time.
- **PDF Generation:** Uses <a href="https://github.com/parallax/jsPDF" target="_blank">jsPDF</a> to turn resume data into a downloadable PDF.
- **Custom Inputs:** Input fields with labels that move out of the way when you type, keeping the design clean and accessible.
- **Easy Navigation:** Buttons to jump back to previous sections for quick edits.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Build Tool**: Vite
- **Deployment**: Vercel
- **PDF Library**: jsPDF

## Development Journey

Building Resume Wizard was tough but rewarding. Think of it as my React training montage, like Harry mastering the Patronus Charm, but with more debugging spells and fewer Dementors.

I started with a basic, but full implementation, then ultimately decided to re-approach the project with the goal of better applying React principles as well as integrating a PDF-generation library. I figured the challenge would give me plenty of opportunity to not only hone my new React skills, but also to drill-down on JavaScript fundamentals, third-party library usage, and Responsive-design techniques.

There was admittedly quite a bit more trial and error than I anticipated going into the second approach, but I'm very glad I did it; I feel like a much stronger developer because of it.

## Challenges

- **PDF Generation:** Finding and using a PDF library was tricky because of outdated and sometimes confusing documentation paired with my limited knowledge of the inner-workings of PDFs. I had to try a few dfferent libraries before finding one that worked for this project.
- **Interface Design:** Balancing the HTML structure with the logic of the application was difficult. Next time, I think allocating a bit more time to sketching out the design first will better streamline and speed-up the entire process altogether.

## What I Learned

This project helped me to learn and improve multiple skills:

- React state management and object destructuring
- Creating custom hooks and avoiding prop-drilling
- Using state effectively, working with nested components, and data mapping
- Filtering objects and using ternary operators
- Deploying a project through Vercel
- Working with external JavaScript Libraries and reviewing documentation

## Future Improvements

If I had more time, I'd refactor the code to be even more modular and reduce repetition. I feel that doing this on initial-write of a codebase is a skill that will improve greatly through deliberate practice, and the second approach on this project certainly propelled me in this regard.
