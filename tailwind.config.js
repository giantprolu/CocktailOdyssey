/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          dark: '#E05050',
          light: '#FF8A8A',
          blue: '#2D3648',
          orange: '#FF8A00',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          dark: '#3DBDB5',
          light: '#6FDFD7'
        },
        dark: {
          DEFAULT: '#292F36',
          light: '#3A4149'
        },
        light: {
          DEFAULT: '#F7F9FB',
          dark: '#E8EDF2'
        },
        cream: {
          DEFAULT: '#FFF7ED'
        },
        'input-text': '#012436',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Orelega One', 'serif'],
        rubik: ['Rubik', 'sans-serif'],
      },
      fontWeight: {
        medium: 500,
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      },
      letterSpacing: {
        'heading': '0.02em', 
        'tab': '0.03em',     
        'input': '0.03em',
        'cave': '0.03em',    // Ajout pour le texte de la cave
      },
      lineHeight: {
        'heading': '48px',
        'tab': '100%',
        'input': '100%',
        'cave': '100%',      // Ajout pour le texte de la cave
      },
      fontSize: {
        'heading': '40px',
        'tab': '16px',
        'cave': '16px',  // Ajout pour le texte de la cave
      },
      verticalAlign: {
        'middle': 'middle',
      },
      textDecoration: {
        'cap-height': 'cap-height',
      },
    }
  },
  plugins: [],
}