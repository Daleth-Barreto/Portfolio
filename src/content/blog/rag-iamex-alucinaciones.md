---
title: "Redesigning a RAG and sleeping 10% fewer hallucinations"
description: "My time as Senior AI Engineer at IAMEX and the RAG redesign of Mexico's sovereign assistant, I'AM Chat."
pubDate: 2026-03-11
tags: ["RAG", "IAMEX", "LLM", "Mexico"]
---

I worked on the conversational assistant that Mexico now knows as **I'AM Chat**, launched in November 2025. My role: **Senior AI Engineer (RAG)** at IAMEX, Mexico's sovereign AI platform.

The goal was tough: a government assistant that must not invent, because people depend on its answers. And my specific task was to redesign the *retrieval-augmented generation* system so it hallucinates less.

## What was breaking

Classic RAG retrieves documents, stuffs them into the prompt and prays. The typical problems:

- **Poorly prioritized context**: the model read 20 chunks when only 3 were relevant.
- **Chunks cut mid-thought**: retrieving half a paragraph is almost worse than retrieving nothing.
- **No fidelity control**: the model could "fill in" from its own priors instead of anchoring to the document.

## The redesign

I redesigned the entire architecture:

1. **Semantic chunking** instead of fixed-size slices.
2. **Aggressive re-ranking** so only what survives the relevance filter enters the prompt.
3. **Citation anchoring**: the answer must map to retrieved fragments, or the model says so explicitly.
4. **Confidence thresholds** for saying "I don't know" instead of inventing.

The result was a **10% reduction in the hallucination rate**. In a sovereign assistant, that 10% isn't a metric: it's people getting correct information instead of made-up facts.

## The takeaway

A good RAG isn't "vector store + a nice prompt." It's **systems engineering**: where you cut the text, how you rank the evidence, and when the model should shut up. That, plus the fact that latency rules: *elegance is nice, but the user doesn't want an essay — they want an answer.*
