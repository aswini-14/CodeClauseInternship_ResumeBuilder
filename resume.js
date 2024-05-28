document.getElementById('addEducationBtn').addEventListener('click', addEducation);
document.getElementById('addExperienceBtn').addEventListener('click', addExperience);
document.getElementById('resumeForm').addEventListener('submit', generateResume);

function addEducation() {
    const educationSection = document.getElementById('educationSection');
    const newEducation = document.createElement('div');
    newEducation.className = 'educationEntry';
    newEducation.innerHTML = `
        <label for="school">School</label>
        <input type="text" name="school" required>
        <label for="degree">Degree</label>
        <input type="text" name="degree" required>
        <label for="year">Year</label>
        <input type="text" name="year" required>
        <button type="button" onclick="removeEducation(this)">Remove</button>
    `;
    educationSection.appendChild(newEducation);
}

function removeEducation(element) {
    element.parentNode.remove();
}

function addExperience() {
    const experienceSection = document.getElementById('experienceSection');
    const newExperience = document.createElement('div');
    newExperience.className = 'experienceEntry';
    newExperience.innerHTML = `
        <label for="company">Company</label>
        <input type="text" name="company" required>
        <label for="role">Role</label>
        <input type="text" name="role" required>
        <label for="years">Years</label>
        <input type="text" name="years" required>
        <button type="button" onclick="removeExperience(this)">Remove</button>
    `;
    experienceSection.appendChild(newExperience);
}

function removeExperience(element) {
    element.parentNode.remove();
}

function generateResume(event) {
    event.preventDefault();

    const form = document.getElementById('resumeForm');
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const education = formData.getAll('school').map((school, index) => {
        return {
            school: school,
            degree: formData.getAll('degree')[index],
            year: formData.getAll('year')[index]
        };
    });
    const experience = formData.getAll('company').map((company, index) => {
        return {
            company: company,
            role: formData.getAll('role')[index],
            years: formData.getAll('years')[index]
        };
    });
    const skills = formData.get('skills').split(',');

    const preview = document.getElementById('preview');
    preview.innerHTML = `
        <h2>${name}</h2>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <h3>Education</h3>
        ${education.map(edu => `<p>${edu.degree} from ${edu.school}, ${edu.year}</p>`).join('')}
        <h3>Work Experience</h3>
        ${experience.map(exp => `<p>${exp.role} at ${exp.company}, ${exp.years}</p>`).join('')}
        <h3>Skills</h3>
        <p>${skills.join(', ')}</p>
    `;
    preview.style.display = 'block';
    document.getElementById('downloadBtn').style.display = 'block';
}

document.getElementById('downloadBtn').addEventListener('click', () => {
    const preview = document.getElementById('preview');
    html2pdf(preview, {
        margin: 1,
        filename: 'resume.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait' }
    });
});
