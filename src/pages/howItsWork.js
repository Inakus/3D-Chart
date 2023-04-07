export default function HowItsWork() {
  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-7xl font-bold">Hello there</h1>
          <p className="py-6 text-2xl">
            This app can can generete random Surface 3D chart or create one from
            file. If you want generate chart from file, first you file need to
            by in <strong>.csv</strong> format, next in first row there must be
            key like date or ordinal number. In next rows they can be value
            numbers. Remeber if the numbers are floating point they must be
            separeated by a dot.
          </p>
        </div>
      </div>
    </div>
  );
}
