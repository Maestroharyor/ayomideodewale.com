export function capitalizeString(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toJSONString(data: object | unknown[] | string | number): string {
	return JSON.stringify(data);
}

/** Escapes user input before it is interpolated into the confirmation email HTML. */
export function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

export function confirmHTMLResponse(rawName: string, origin: string) {
	const name = escapeHtml(rawName);
	const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Contact Form Reply</title>
  <style>
    body{
      background-color:#F0F0F0;
      padding: 20px 0;
      font-family: sans-serif;
      line-height: 1.8rem;
      font-size: 1.2rem;
    }
    table, table.main{
      width: 100%;
      max-width: 600px; 
    }
    
    table.main {
      margin: 0 auto;
      background-color:#fff;
      border-radius: 8px;
      padding: 10px;
    }
    
    h1{
      text-align: center;
      padding: 10px 0;
    }
    
    a {
      color: #127DB3;
    } 
    
    a:hover{
      color: #0c56d0;
    }
  </style>
</head>
<body>
  <table class="main">
    <tr>
      <td style="background:#42489E; color:#fff; border-radius:8px 8px 0 0; margin-bottom: 10px; font-size: 1rem; padding: 5px; line-height: 3rem;">
        <h1>Thanks for getting in touch</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 0px 20px 20px 20px; font-size: 1rem;">
        <p>Hello ${name} 👋,</p>
        <p>Thank you for reaching out through my portfolio website's contact form. As a fullstack developer, I'm excited to learn more about your project and how I can contribute.</p>
        <p>To better understand your needs, please provide additional details such as the technologies you have in mind, specific functionalities required, and desired timeline for completion.</p>
        <p>I prioritize clean code, user experience, and performance. My tech stack includes a wide range of technologies such as JavaScript, TypeScript, React, Vue, Svelte, Node.js, Python, and various databases. I'm also comfortable working with frameworks and tools such as Flutter, Express.js, Django, MongoDB, and MySQL.</p>
        <p>Let's discuss the next steps, including timelines, deliverables, and pricing. I'm committed to delivering value for your investment.</p>
        <p>Thank you for considering me. I'll respond to your message soon. Feel free to explore my <a href="https://ayomideodewale.com">portfolio website in the meantime</a> or check my social media links below: 👇</p>
        <br>
        <span>Best regards, <br /> Ayomide Odewale</span>        
      </td>
    </tr>
    <tr>
      <td>
        <div style="background:#cdcdcd; display:flex; justify-content: center; gap:15px; padding: 20px 0; font-size: 20px; border-radius:0 0 8px 8px; align-items: center">
          <a href="https://github.com/MaestroHaryor" target="_blank" rel="noreferrer" class="block text-primary hover:text-primary-hov dark:text-white dark:hover:text-warning" aria-label="Github" title="Github">
          <img src="${origin}/email/github.png" width="25" height="25" alt="GitHub" style="display:block;border:0;" />

            
          </a>
          <a href="https://www.linkedin.com/in/ayomide-odewale/" target="_blank" rel="noreferrer" class="block text-primary hover:text-primary-hov dark:text-white dark:hover:text-warning" aria-label="LinkedIn" title="LinkedIn">
           <img src="${origin}/email/linkedin.png" width="25" height="25" alt="LinkedIn" style="display:block;border:0;" />

          </a>
          <a href="https://twitter.com/MaestroHaryor" target="_blank" rel="noreferrer" class="block text-primary hover:text-primary-hov dark:text-white dark:hover:text-warning" aria-label="Twitter" title="Twitter">
           <img src="${origin}/email/twitter.png" width="25" height="25" alt="Twitter" style="display:block;border:0;" />
          </a>
          <a href="https://web.facebook.com/ayomide.odewale.125" target="_blank" rel="noreferrer" class="block text-primary hover:text-primary-hov dark:text-white dark:hover:text-warning" aria-label="Facebook" title="Facebook">
          <img src="${origin}/email/facebook.png" width="25" height="25" alt="Facebook" style="display:block;border:0;" />

          </a>
          <a href="https://instagram.com/maestroharyorjoshua" target="_blank" rel="noreferrer" class="block text-primary hover:text-primary-hov dark:text-white dark:hover:text-warning" aria-label="Instagram" title="Instagram">
           <img src="${origin}/email/instagram.png" width="25" height="25" alt="Instagram" style="display:block;border:0;" />

          </a>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;

	return html;
}
