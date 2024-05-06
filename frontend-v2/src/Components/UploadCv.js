import { ThemeProvider } from "@material-tailwind/react";

export default function UploadCv() {
  return (
    <div className="relative">
      <input
        id="resume-upload"
        type="file"
        className="hidden"
        accept=".pdf,.doc,.docx"
        onChange={(e) => {
          const file = e.target.files[0];
          // Do something with the uploaded file
          console.log(file);
        }}
      />
      <label htmlFor="resume-upload" className="cursor-pointer bg-myBlue-300 text-myBlue-950 px-4 py-2 rounded-md flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-5 w-5 absolute left-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
          />
        </svg>
        Upload Your Resume
      </label>
    </div>
  );
}
