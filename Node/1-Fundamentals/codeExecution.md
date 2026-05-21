Concurrency & Parallelism, Blocking & Non-blocking, Synchronous & Asynchronous
---

## 1. Concurrency vs Parallelism

Both deal with handling multiple tasks, but they have different perspectives:

- Concurrency: A single system works on multiple tasks by quickly switching between them.

 In concurrency multiple tasks progress together but not necessarily at the same moment.

- Parallelism: Dividing the task into sub-task and distributing these sub-tasks to multiple system.

 Here multiple tasks run simultaneously using multiple CPU/processors.

# Real-world Node.js understanding

- Node.js is mainly good at:

 Concurrency
 Non-blocking operations
 Asynchronous I/O

- Node.js is NOT naturally for:

 Heavy CPU parallel work
For true parallel CPU work, Node.js uses:
 Worker Threads
 Clusters
 Multiple processes

---

## 2. Blocking vs Non-blocking

These terms describe whether the caller(program) must wait for the operation to finish.

- Blocking: the caller is paused until the operation completes (synchronous wait).
- Non-blocking: the caller starts the operation and continues immediately; completion is reported later.

When to use which:

- Blocking is simpler and OK for scripts or short-lived tasks.
- Non-blocking is better for servers or UIs where you must stay responsive.

# Note:
 Non-blocking I/O often relies on OS support (async syscalls) or background threads; it doesn't imply parallel CPU work by itself.

---

## 3. Synchronous vs Asynchronous

These describe control flow.

- Synchronous: Step-by-Step execution.
 Next step waits for previous step to complete. Everything happens in order.
 
- Asynchronous: Work now, result later
 You start them and handle the result via callbacks, Promises, or events while doing other work.

Practical mapping:

- Synchronous + blocking: Wait and execute step-by-step 
 Simple but can waste time (e.g., `readFileSync`).
- Asynchronous + non-blocking: Continue working while task finishes later
 Responsive and scalable for I/O-bound systems (e.g., `readFile` with callback/Promise).

---

## Quick cheat-sheet

```
Concurrency    = many tasks progress in single CPU(time-shared)
Parallelism    = many tasks run exactly at the same time (multiple cores)
Blocking       = caller waits until operation finishes
Non-blocking   = caller continues; completion reported later
Synchronous    = steps run in order; each waits for previous
Asynchronous   = start work now; handle result later (callback/Promise)
```

---
