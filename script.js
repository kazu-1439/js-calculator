$(function () {

  let display = "";

  $(".btn").on("click", function () {
    const value = $(this).text();
    const lastChar = display.slice(-1);

    // 最初に00は置けない
    if (display === "" && value === "00") {
      return;
    }

    // 0のつぎに00は置けない
    if (display === "0" && value === "00") {
      return;
    }

    // 011のように0の後に数字が来たら置き換える
    if (display === "0" && value !== "." && !isNaN(value)) {
      display = value;
      $(".display").text(display);
      return;
    }

    // 演算子の連続を防止
    if (isOperator(lastChar) && isOperator(value)) {
      return;
    }

    // 小数点の連続を防止
    if (value === "." && lastChar === ".") {
      return;
    }

    display += value;
    $(".display").text(display);
  });

  // ACで全消し
  $(".ac").on("click", function () {
    display = "";
    $(".display").text("0");
  });

  // =で計算
  $(".equal").on("click", function () {
    try {
      display = eval(display);
      $(".display").text(display);
    } catch (e) {
      $(".display").text("エラー");
      display = "";
    }
  });

  // 演算子判定
  function isOperator(char) {
    return ["+", "-", "*", "/"].includes(char);
  }

});