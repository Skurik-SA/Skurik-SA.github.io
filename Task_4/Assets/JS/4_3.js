$(function ()
{

	$("#matrix").click(
		function (e) {
		    $("#OUtPut").text(ResDo());
            $("#m_1").text();
		}
	);
});
/**
 * Функция для генерации случайного целого числа
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + Math.floor(min);
}

/**
 * Функция, которая создаёт двумерный массив
 */
function CreateAnArray(rows, columns) {
	var arr = new Array();
	for (var i = 0; i < rows; i++) {
		arr[i] = new Array();

		for (var j = 0; j < columns; j++) {
			arr[i][j] = Math.floor(getRandomInt(0, 10));
		}
	}
	return arr;
}

/**
 * Возвращает массив с количеством элементов превышающих средние по срокам в матрице
 */
function getCountsAverages(matrix) {

	var result = [];
    var average = [];

	for (var i = 0; i < matrix.length; i++) {

		// считаем среднее для строки
		var sum = 0;
		for (var j = 0; j < matrix[i].length; j++) {
			sum += matrix[i][j];
		}
		average[i] = sum / matrix[i].length;

		// считаем количество элементов превысивших среднее по строке
		result[i] = 0;
		for (var j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] > average[i]) {
				result[i] += 1;
			}
		}

		// для проверки выводим в консоль
		console.log("строка " + (i + 1) + ": " + matrix[i], "среднее: " + average[i], "количество: " + result[i]);
	}
    $("#m_1").text("строка " + 1 + ": " + matrix[0] + " |     " + "среднее: " + average[0] + " |     " + "количество: " + result[0]);
    $("#m_2").text("строка " + 2 + ": " + matrix[1] + " |     " + "среднее: " + average[1] + " |     " + "количество: " + result[1]);
    $("#m_3").text("строка " + 3 + ": " + matrix[2] + " |     " + "среднее: " + average[2] + " |     " + "количество: " + result[2]);
    $("#m_4").text("строка " + 4 + ": " + matrix[3] + " |     " + "среднее: " + average[3] + " |     " + "количество: " + result[3]);
    $("#m_5").text("строка " + 5 + ": " + matrix[4] + " |     " + "среднее: " + average[4] + " |     " + "количество: " + result[4]);
    $("#m_6").text("строка " + 6 + ": " + matrix[5] + " |     " + "среднее: " + average[5] + " |     " + "количество: " + result[5]);
    $("#m_7").text("строка " + 7 + ": " + matrix[6] + " |     " + "среднее: " + average[6] + " |     " + "количество: " + result[6]);
    $("#m_8").text("строка " + 8 + ": " + matrix[7] + " |     " + "среднее: " + average[7] + " |     " + "количество: " + result[7]);
	return result;
}


function ResDo()
{
var myMatrix = CreateAnArray(8, 6); // Вызов функции для создания массива

//console.log(myMatrix);

var P = getCountsAverages(myMatrix);

return("результат P: " + P);
}