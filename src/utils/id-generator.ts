function* idGenerator(): Generator<string> {
  let count = 0;
  while (true) {
    yield `id-${++count}`;
  }
}

export { idGenerator };
