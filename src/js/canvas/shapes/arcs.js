export class TimeArc {
    constructor(x, y, radius, thickness, color, maxUnit) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.thickness = thickness;
        this.color = color;
        this.maxUnit = maxUnit;
    }

    draw(context, unit) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, -Math.PI / 2, (-Math.PI / 2) + (Math.PI * 2) * (unit / this.maxUnit), false);
        context.strokeStyle = this.color;
        context.lineWidth = this.thickness;
        context.stroke();
        context.closePath();
    }
}
