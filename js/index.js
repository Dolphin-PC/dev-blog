try {
  async function fn() {
    const data1 = await sampleFunc(); // 문제 발생시 data1값이 유효치 않음
    const data2 = await sampleFunc2(data1);
    console.log(data2);
  }

  fn();
} catch (error) {
  console.error(error);
}

function sampleFunc() {
  return new Promise((resolve, reject) => {
    reject();
  });
}

function sampleFunc2() {
  return new Promise((resolve, reject) => {
    resolve();
  });
}
