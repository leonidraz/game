// Получаем элемент canvas из DOM
var cvs = document.getElementById("canvas");
// Получаем 2D контекст рисования для холста
var ctx = cvs.getContext("2d");

// Создаем объекты изображений для всех игровых элементов
var spaceship = new Image();  // Космолет
var bg = new Image();    // Задний фон
var pipeUp = new Image();  // Верхняя часть трубы
var pipeBottom = new Image();  // Нижняя часть трубы

// Указываем источники изображений
spaceship.src = "img/bird.png";
bg.src = "img/bg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";

// Устанавливаем расстояние между верхней и нижней трубой
var gap = 90;

// Обработчик события нажатия на клавишу
document.addEventListener("keydown", moveUp);

// Функция для движения птички вверх при нажатии клавиши
function moveUp() {
    yPos -= 25;
    fly.play();  // Воспроизведение звука полета
}

// Создаем массив для хранения столбов
var pipe = [];

// Задаем начальное состояние игры: один столб на экране
pipe[0] = {
    x : cvs.width,
    y : 0
}

// Инициализируем переменные для отслеживания счета и позиции космолета
var score = 0;  // Счет игрока
var xPos = 10;  // Позиция по горизонтали
var yPos = 150; // Позиция по вертикали
var grav = 1.5; // Гравитация (скорость падения космолета)

// Основная функция для отрисовки игры
function draw() {
    // Отрисовываем задний фон
    ctx.drawImage(bg, 0, 0);

    // Отрисовываем трубы из массива pipe
    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);  // Верхняя часть столба
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);  // Нижняя часть столба

        // Двигаем столбы влево
        pipe[i].x--;

        // При достижении определенной позиции добавляем новый столб
        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        // Проверяем столкновения космолета со столбами и границами экрана
        if(xPos + spaceship.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height || yPos + spaceship.height >= pipe[i].y + pipeUp.height + gap) ||
            yPos + spaceship.height >= cvs.height - fg.height) {
            location.reload(); // Перезагрузка страницы при столкновении
        }

        // Проверяем, пролетел ли космолет очередной столб и увеличиваем счет
        if(pipe[i].x == 5) {
            score++;
        }
    }

    // Отрисовываем передний план поверх столбов и космолета
    ctx.drawImage(fg, 0, cvs.height - fg.height);

    // Отрисовываем космолет
    ctx.drawImage(spaceship, xPos, yPos);

    // Обновляем позицию космолета (гравитация)
    yPos += grav;

    // Отображаем текущий счет игрока
    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 20);

   
// Запускаем функцию draw снова для обновления экрана
 requestAnimationFrame(draw);
}

pipeBottom.onload = draw;