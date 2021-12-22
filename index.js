const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
var dragonContainer = document.getElementById('container');

var dragonScale = 1;
const image = new Image();
image.src = './img/dragon.png';

image.onload = function () {
  canvas.height = image.height;
  canvas.width = image.width;
  ctx.drawImage(image, 0, 0);
  getImageData(ctx, image);
};
document.body.appendChild(canvas);
// getImageData(ctx, image)
// 获取图片点阵信息
function getImageData(ctx, image) {
  var imageData = ctx.getImageData(0, 0, image.width, image.height).data;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, image.width, image.height);

  var gap = 6;

  for (var h = 0; h < image.height; h += gap) {
    for (var w = 0; w < image.width; w += gap) {
      var position = (image.width * h + w) * 4;
      var r = imageData[position],
        g = imageData[position + 1],
        b = imageData[position + 2];
      console.log(w, h);
      var rgb = r + g + b;
      if (rgb < 200) {
        var bubble = document.createElement('img');
        bubble.src = './img/icon-location.png';
        bubble.setAttribute('class', 'bubble');
        var bubbleSize = 40;
        bubble.style.left = w * dragonScale - bubbleSize / 2 + 'px';
        bubble.style.top = h * dragonScale - bubbleSize / 2 + 'px';
        bubble.style.width = bubble.style.height = bubbleSize + 'px';
        // bubble.style.animationDuration = Math.random() * 6 + 4 + 's';
        dragonContainer.appendChild(bubble);
      }
    }
  }
}
