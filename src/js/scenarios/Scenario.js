import Scene from "../canvas/Scene"; 
import { TimeArc } from "../canvas/shapes/arcs"; 

export default class Scenario extends Scene {
    constructor(id) {
        super(id);

        this.hourArc = new TimeArc(this.width / 2, this.height / 2, 100, 14, "red", 12);
        this.minuteArc = new TimeArc(this.width / 2, this.height / 2, 120, 10, "yellow", 60);
        this.secondArc = new TimeArc(this.width / 2, this.height / 2, 140, 6, "blue", 60);
    }

    drawUpdate() {
        super.clear();

        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        this.hourArc.draw(this.context, hours % 12 || 12); 
        this.minuteArc.draw(this.context, minutes);
        this.secondArc.draw(this.context, seconds);

        this.drawWatchCase();

        // this.drawCurrentTime(hours, minutes, seconds);  //ajout de l'heure réelle en text
    }

    drawWatchCase() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = Math.max(this.width, this.height) / 2 * 0.8;
        this.context.strokeStyle = 'black'

        this.context.beginPath();
        this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        this.context.stroke();
        this.context.closePath();

        for (let hour = 0; hour < 12; hour++) {
            let angle = (hour - 3) * (Math.PI * 2) / 12;
            let innerRadius = radius * 0.9;
            let outerRadius = radius;
            let innerX = centerX + Math.cos(angle) * innerRadius;
            let innerY = centerY + Math.sin(angle) * innerRadius;
            let outerX = centerX + Math.cos(angle) * outerRadius;
            let outerY = centerY + Math.sin(angle) * outerRadius;

            this.context.beginPath();
            this.context.moveTo(innerX, innerY);
            this.context.lineTo(outerX, outerY);
            this.context.stroke();
            this.context.closePath();
        }
    }

    drawCurrentTime(hours, minutes, seconds) {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const currentTime = this.formatTime(hours, minutes, seconds);

        this.context.fillStyle = 'black';
        this.context.font = 'bold 20px Arial';
        this.context.textAlign = 'center';

        this.context.fillText(currentTime, centerX, centerY);
    }

    formatTime(hours, minutes, seconds) {
        const formattedHours = this.padZero(hours);
        const formattedMinutes = this.padZero(minutes);
        const formattedSeconds = this.padZero(seconds);
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }

    update() {
        if (!super.update()) return;
        this.drawUpdate();
    }
}
