document.addEventListener('DOMContentLoaded', () => {
    // --- Matrix Rain Effect ---
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');

    // Set canvas size to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const codeChars = '!=<>[]{}/\\|;:+&%$#@';

    const alphabet = katakana + latin + nums + codeChars;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(15, 12, 41, 0.1)'; // Dark purple fade
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00f3ff'; // Cyan text for Matrix rain
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);

    // Handle Window Resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // --- Typewriter Effect for IDE ---
    const codeContainer = document.getElementById('java-code');
    const codeLines = [
        '<span class="keyword">package</span> com.life.milestones;',
        '',
        '<span class="keyword">public class</span> <span class="type">Birthday</span> {',
        '    <span class="keyword">public static void</span> <span class="method">main</span>(String[] args) {',
        '        <span class="type">String</span> name = <span class="string">"Shahyan Ahmed Kiani"</span>;',
        '        <span class="type">LocalDate</span> date = <span class="type">LocalDate</span>.of(2026, 1, 22);',
        '',
        '        <span class="comment">// Executing birthday wishes...</span>',
        '        <span class="type">System</span>.out.println(<span class="string">"Happy Birthday, "</span> + name + <span class="string">"!"</span>);',
        '        <span class="type">System</span>.out.println(<span class="string">"May your code always compile."</span>);',
        '        <span class="type">System</span>.out.println(<span class="string">"May your bugs be minor."</span>);',
        '        <span class="type">System</span>.out.println(<span class="string">"Keep coding your dreams into reality!"</span>);',
        '    }',
        '}'
    ];

    let lineIndex = 0;
    let charIndex = 0;
    const typeSpeed = 30; // ms per char
    const lineDelay = 300; // ms between lines

    function typeCode() {
        if (lineIndex < codeLines.length) {
            const currentLine = codeLines[lineIndex];
            // Since we are using HTML tags for coloring, simple char-by-char typing is tricky.
            // Simplified approach: Render line by line for simplicity, or
            // parsing the HTML tags. 
            // For better effect, let's just append the full HTML line with a small delay for "typing" feel of blocks.
            // Or better: Use a pre-rendered hidden div and reveal char by char? 
            // Let's stick to appending full lines with typing simulation if it was plain text.
            // Given the HTML span tags, appending the whole HTML string for the line is safer to prevent broken tags.

            const p = document.createElement('div');
            p.innerHTML = currentLine + '&nbsp;'; // Add non-breaking space to keep height
            p.style.opacity = '0';
            p.style.transform = 'translateX(-10px)';
            p.style.transition = 'opacity 0.3s, transform 0.3s';
            codeContainer.appendChild(p);

            // Trigger animation
            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateX(0)';
            }, 50);

            // Move blinking cursor
            // (Cursor is adjacent, so just adding content pushes it down)

            lineIndex++;
            setTimeout(typeCode, lineDelay);
        }
    }

    // Start typing after a short delay
    setTimeout(typeCode, 1500);
});
