import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiCheckCircle, HiShieldCheck, HiLightningBolt } from 'react-icons/hi';

const features = [
  {
    icon: <HiCheckCircle className="text-3xl text-purple-400" />,
    title: 'Task Management',
    desc: 'Create, update and track your tasks with ease'
  },
  {
    icon: <HiShieldCheck className="text-3xl text-green-400" />,
    title: 'Secure Auth',
    desc: 'JWT based authentication with role based access'
  },
  {
    icon: <HiLightningBolt className="text-3xl text-yellow-400" />,
    title: 'Fast & Scalable',
    desc: 'Built with modern tech stack for performance'
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Manage Tasks
          <span className="text-purple-400"> Effortlessly</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          A simple and powerful task management app with secure authentication
          and role based access control. Built for teams and individuals.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link
            to="/register"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl text-lg font-medium transition transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-slate-600 hover:border-slate-400 text-slate-300 px-8 py-3 rounded-xl text-lg font-medium transition transform hover:scale-105"
          >
            Login
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:border-purple-500/50 transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-500 text-sm border-t border-slate-800">
        TaskFlow &copy; {new Date().getFullYear()} — Built with React & Express
      </footer>
    </div>
  );
};

export default Landing;
