// 获取canvas实例
const canvas = document.getElementById('canvas')
// 获取2d上下文
const ctx = canvas.getContext("2d")
// 获取页面上的div容器
const container = document.getElementById('container')
// 存储所有点阵图的位置信息{x, y}
const positionCache = []
// 定义缩放值
const scale = 1.5

const img = new Image()
img.src = "./static/520.png"
// 画出无序状态的点阵图
img.onload = function () {
    canvas.width = img.width / 1.5
    canvas.height = img.height / 1.5
    ctx.drawImage(img,0,0, img.width, img.height, 0, 0, img.width/1.5, img.height/1.5)
    const imageData = ctx.getImageData(0, 0, img.width, img.height).data
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, img.width, img.height)

    const gap = 6

    for (let h = 0; h < img.height; h += gap) {
        for (let w = 0; w < img.width; w += gap) {
            let position = (img.width * h + w) * 4
            let r = imageData[position]
            let g = imageData[position + 1]
            let b = imageData[position + 2]
            if (r + g + b !== 0) {
                let div = document.createElement('div')
                div.setAttribute('class', 'circle2')
                div.style.backgroundColor = `rgba(${r}, ${g}, ${b},1)`
                div.style.transform = `translate3d(${Math.random() * 500}px, ${Math.random() * 500}px, 0)`
                positionCache.push({ x: w * scale + 'px', y: h * scale + 'px'})
                container.appendChild(div)
            }
        }
    }
}

// 触发排序
function move() {
    setTimeout(() => {
        let index = 0
        for (let div of container.children) {
            div.style.transform = `translate3d(${positionCache[index].x}, ${positionCache[index].y}, 0)`
            index++
        }
    }, 500)
}

