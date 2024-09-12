const [mover, prompter] = await Promise.all([
  import("./mainMover.js"),
  import("./mainPrompter.js"),
]);
(mover.default)();
prompter.default();
