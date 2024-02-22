document.addEventListener('DOMContentLoaded', function() {
    // Constants
    let numPoints, minPoints;
    const minDistance = 100; // Minimum distance for connecting points
    const maxSpeed = 5; // Maximum falling speed

    // Determine number of points based on device width
    if (window.innerWidth < 768) { // Adjust this threshold as needed
        numPoints = 50;
        minPoints = 30;
    } else {
        numPoints = 150;
        minPoints = 75;
    }

    // Create initial points
    let points = createInitialPoints();

    // Create initial points function
    function createInitialPoints() {
        const newPoints = [];
        for (let i = 0; i < numPoints; i++) {
            const point = {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vy: Math.random() * maxSpeed // Only vertical speed
            };
            newPoints.push(point);
        }
        return newPoints;
    }

    // Connect points
    function connectPoints() {
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < minDistance) {
                    const opacity = 1 - distance / minDistance;
                    drawLine(points[i].x, points[i].y, points[j].x, points[j].y, opacity);
                }
            }
        }
    }

    // Draw lines
    function drawLine(x1, y1, x2, y2, opacity) {
        const canvas = document.getElementById('background');
        const ctx = canvas.getContext('2d');
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1; // Increased line width for better visibility
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Animation loop
    function animate() {
        const canvas = document.getElementById('background');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Ensure minimum number of points
        if (points.length < minPoints) {
            const numNewPoints = minPoints - points.length;
            for (let i = 0; i < numNewPoints; i++) {
                const point = {
                    x: Math.random() * window.innerWidth,
                    y: 0, // Start from the top
                    vy: Math.random() * maxSpeed // Only vertical speed
                };
                points.push(point);
            }
        }

        // Update points
        for (const point of points) {
            point.y += point.vy; // Update only vertical position
            
            // Reset position if point goes below the screen
            if (point.y > window.innerHeight) {
                point.y = 0;
                point.x = Math.random() * window.innerWidth; // Reset horizontal position
            }
            
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
        
        connectPoints();
        
        requestAnimationFrame(animate);
    }

    // Resize canvas to match window dimensions
    function resizeCanvas() {
        const canvas = document.getElementById('background');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
});
