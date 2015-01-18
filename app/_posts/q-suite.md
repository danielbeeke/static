---
title: git reset --soft as stash replacement and undo
tags:
- Git
---

With , if you have some work in progress and find you need to switch to another incompatible branch, you can <code>git stash</code> the changes and later restore them with <code>git stash pop</code>.

However, I dislike having to remember I have something stashed. It's easy to forget. (Idea: make the shell prompt indicate stash.) Instead, when I have work in progress, I just commit it as usual, with something like "WiP" as the message:
