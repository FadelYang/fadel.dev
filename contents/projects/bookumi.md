---
title: "Bookumi - A Book Recommender System"
date: "2026-07-03"
excerpt: "A website that integrates a hybrid recommender system to recommend books that users may like."
tags: ["Machine Learning", "FastAPI", "Python", "Next.js", "TypeSCript", "Zustand"]
languages: ["English"]
featured: false
type: "projects"
isDraft: false
---

# TLDR

This project was created as my bachelor's final project. I built it to answer a question I had after seeing many recommender system research papers. Most of them focus on improving recommendation algorithms, but very few explain how to integrate those algorithms into a real application so that end users can actually use them easily.

For this project, I chose the book domain because books are popular among people in my city, and the reading rate has been increasing in <a href="https://www.detik.com/edu/detikpedia/d-8252176/tingkat-kegemaran-membaca-jakarta-pada-2025-meningkat-perpus-makin-ramai" target="_blank" rel="noopener noreferrer">
  recent years
</a>. The dataset used in this project is the Goodreads dataset, which was crawled and published by researchers from the University of California, San Diego. It is publicly available at <a href="https://cseweb.ucsd.edu/~jmcauley/datasets/goodreads.html" target="_blank" rel="noopener noreferrer">
  Goodreads Datasets
</a>.

I use Hybrid Recommender System with "Switching Hybrid Approach" method. The method will use content-based filtering method if the user hasn't rated any books yet. Otherwise, it will use the collaborative filtering method.

In this project, I do not focus on optimizing the recommendation algorithms. Instead, I focus on the implementation strategy and the user experience.
