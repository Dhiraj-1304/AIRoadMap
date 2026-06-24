const generatePrompt =({
  careerGoal,
  skillLevel,
  duration,
  weeklyHours,
  interests,
}) => {
  return `
  Your are an expert career counselor. You have to create a personalized roadmap for a user.

  Generate a highly detailed roadmap for a user based on the following information:

  Career Goal: ${careerGoal}
  Skill Level: ${skillLevel}
  Duration: ${duration}
  Weekly Hours: ${weeklyHours}
  Interest: ${interests && interests.length > 0 ? interests.join(", ") : "None"}

  Return the roadmap ONLY in a JSON format with the following structure:
  {
  "title": "",
  "description": "",
  "phases": [
    {
      "phase": "",
      "duration": "",
      "topics": [],
      "projects": [],
      "resources": []
    }
  ]
}
  Rules:
  1. The roadmap should be divided into multiple phases, each with a clear title and duration.
  2. Each phase should include a list of topics to be covered, projects to be completed, and resources to be used.
  3. The roadmap should be personalized based on the user's career goal, skill level, duration, weekly hours, and interests.
  4. The roadmap should be comprehensive and cover all necessary skills and knowledge required to achieve the career goal.
  5. The roadmap should be realistic and achievable within the specified duration and weekly hours.

- No markdown
- No explanation text
- JSON only
- Minimum 4 phases
- Beginner-friendly base on the skill level



  `;
}

export default generatePrompt;