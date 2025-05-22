import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";
import "./Skills.scss";

const skills = [
  { name: "React", icon: "⚛️" },
  { name: "JavaScript", icon: "🟨" },
  { name: "Sass", icon: "🎨" },
  { name: "Framer Motion", icon: "🎥" },
  { name: "Node.js", icon: "🟢" },
  { name: "Stripe API", icon: "💳" },
  { name: "Firebase", icon: "🔥" },
  { name: "Tailwind CSS", icon: "🌬️" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = `*[_type == "skills"] | order(_createdAt asc){
      name,
      icon,
  _createdAt}`;

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);
  console.log(skills);

  return (
    <section className="skills-section">
      <motion.h2
        className="section-title"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6 }}
        viewport={{ amount: 0.3 }}
      >
        My Skills
      </motion.h2>

      <motion.div
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.3 }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="skill-card"
            variants={itemVariants}
          >
            <img src={urlFor(skill.icon)} alt="" />
            <span className="name">{skill.name}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
