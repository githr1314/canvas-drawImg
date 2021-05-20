// 获取canvas实例
const canvas = document.getElementById('canvas')
// 获取2d上下文
const ctx = canvas.getContext("2d")
// 获取页面上的div容器
const container = document.getElementById('container')
// 缩放值
const scale = 1.5
// 定义一个Image对象
const img = new Image()
// 赋予图片资源
img.src = "./static/horse.png"
// 加载完毕后执行
img.onload = function () {
    // 设置画布的大小（1/2）
    canvas.width = img.width / 2
    canvas.height = img.height / 2
    // 将图片画出，位于画布坐标(0, 0)，大小为原图的一半
    ctx.drawImage(img,0,0, img.width, img.height, 0, 0, img.width/2, img.height/2)
    // 通过getImageData获取所有图像的rgba颜色数组
    const imageData = ctx.getImageData(0, 0, img.width, img.height).data
    // 将画布填充为白色
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, img.width, img.height)
    // 设置间隔
    const gap = 6
    // 存储所有点阵图的位置信息{x, y}
    const positionCache = []

    for (let h = 0; h < img.height; h += gap) {
        for (let w = 0; w < img.width; w += gap) {
            let position = (img.width * h + w) * 4
            let r = imageData[position]
            let g = imageData[position + 1]
            let b = imageData[position + 2]
            if (r + g + b !== 0) {
                // 创建div赋予样式和随机位置
                let div = document.createElement('div')
                div.setAttribute('class', 'circle')
                div.style.backgroundColor = `rgba(${r}, ${g}, ${b},1)`
                div.style.transform = `translate3d(${Math.random() * 500}px, ${Math.random() * 500}px, 0)`
                // 保存当前div的正确位置
                positionCache.push({ x: w * scale + 'px', y: h * scale + 'px'})
                // 将div添加到页面
                container.appendChild(div)
            }
        }
    }

    setTimeout(() => {
        let index = 0
        for (let div of container.children) {
            div.style.transform = `translate3d(${positionCache[index].x}, ${positionCache[index].y}, 0)`
            index++
        }
    }, 500)
}