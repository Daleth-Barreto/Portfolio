---
title: "Stim → SNN → RTL → FPGA: my pipeline for decoding qubits"
description: "Quantum error correction with spiking neural networks and a personal pipeline that ends in real hardware."
pubDate: 2026-06-02
tags: ["Quantum", "SNN", "FPGA", "Amaranth"]
---

When I told someone I wanted to decode Surface Codes with spiking neural networks, the answer was: "what does that even mean?" Let's talk about it, unfiltered.

## The problem

Qubits have an existential issue: they make mistakes. **Quantum error correction (QEC)** exists to fix that, but decoding those errors with microsecond latencies is a bottleneck. That's where SNNs come in: they aren't "like" neuromorphic hardware — **they are** neuromorphic hardware.

## My pipeline

I repeat it like a mantra because it's the backbone of almost everything I publish:

```
Stim  →  ML / SNN  →  RTL  →  FPGA
```

- **Stim** generates the stabilizer circuits and error syndromes.
- An **SNN** (sometimes with spatial convolutions, sometimes graph-based like the GCN-SNN at MEXCIR) decodes.
- The architecture is described in **Amaranth HDL** and validated on **FPGA**.

The obsession is a single one: *"if it doesn't run on real hardware, it isn't done."* A model that only lives in a Colab notebook is useless for a quantum controller.

## What I learned

1. **Latency is the enemy.** "Latency beats elegance": a correct but slow decoder is a useless decoder.
2. **Hardware forces you to simplify.** On an FPGA you can't hide the cost of an operation behind `@jit`.
3. **d=3 is for learning, d=7 is for publishing.**

These nanosecond-scale kernels ended up in a paper accepted at the **IEEE qCCL 2026** in Aalborg, Denmark. And the best part: the pipeline is still alive, with more decoders in the oven.
