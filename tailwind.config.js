/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms')
    ],
    corePlugins: {
      preflight: false, // Disable Tailwind's reset to avoid conflicts with Mantine
    }
  }