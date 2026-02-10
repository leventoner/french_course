/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: "#2563EB",
                secondary: "#DC2626",
                success: "#10B981",
                warning: "#F59E0B",
                accent: "#8B5CF6",
                dark: {
                    bg: "#0F172A",
                    card: "#1E293B",
                    text: "#F8FAFC"
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
