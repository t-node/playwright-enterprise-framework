// Helper to simulate async operations:
const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const fetchData = async (id: number): Promise<string> => {
  await delay(100);
  if (id < 0) throw new Error(`Invalid ID: ${id}`);
  return `data-${id}`;
};

const bug3_slow = async (): Promise<void> => {
  console.log("\nBug 3 (SLOW — sequential):");
  const start = Date.now();
  const results: string[] = [];

  for (const id of [1, 2, 3, 4, 5]) {
    const result = await fetchData(id);
    results.push(result);
  }
  console.log(
    `  ${results.length} items in ${Date.now() - start}ms (sequential)`,
  );
  // Promise.all([
  //   fetchData(1),
  //   fetchData(2),
  //   fetchData(3),
  //   fetchData(4),
  //   fetchData(5),
  // ]);
  const startagain = Date.now();
  const resultsr = await Promise.all(
    [1, 2, 3, 4, 5].map((id) => fetchData(id)),
  );
  const r = await Promise.all([1, 2, 3].map((id) => fetchData(id)));
  console.log(
    `  ${results.length} items in ${Date.now() - startagain}ms (parallel)`,
  );
};

bug3_slow();

const bug4_broken = async (): Promise<string> => {
  console.log("\nBug 4 (BROKEN — swallowed error):");
  try {
    const result = await fetchData(-1); // will throw!
    return result;
  } catch (error) {
    console.log(
      "  Error caught but NOT rethrown — caller thinks everything is fine!",
    );
    if (error instanceof Error) {
      console.log(`Error caught and rethrown: ${error.message}`);
    }
    throw error;
  }
};

bug4_broken();
