// 获取canvas实例
const canvas = document.getElementById('canvas')
// 获取2d上下文
const ctx = canvas.getContext("2d")
// 定义一个Image对象
const img = new Image()
// 赋予图片资源
img.src = "./static/horse.png"
// 加载完毕后执行
img.onload = function () {
    // 设置画布的宽和高与图片资源一致
    canvas.width = img.width
    canvas.height = img.height
    // 将图片画出，位于画布坐标(0, 0)
    ctx.drawImage(img,0,0)
    // 通过getImageData获取所有图像的rgba颜色数组
    const imageData = ctx.getImageData(0, 0, img.width, img.height).data
    // 填充整个图片的矩形区域为白色
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, img.width, img.height)
    // 设置间隔
    const gap = 6
    // 循环迭代宽和高，拿去每一个点的r、g、b的值
    for (let h = 0; h < img.height; h += gap) {
        for (let w = 0; w < img.width; w += gap) {
            // 每一组rgba都是间隔4个单位
            let position = (img.width * h + w) * 4
            let r = imageData[position]
            let g = imageData[position + 1]
            let b = imageData[position + 2]
            // 如果不等于黑色的区域，则填充颜色4*4px
            if (r + g + b !== 0) {
                ctx.fillStyle = "rgba(0,0,0,1)"
                ctx.fillRect(w, h, 4, 4)
            }
        }
    }
}