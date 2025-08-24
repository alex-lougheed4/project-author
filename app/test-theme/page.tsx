export default function TestThemePage() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Theme Testing Page</h1>
        <p className="text-xl text-muted-foreground">
          This page demonstrates the theme switching functionality. Use the
          theme toggle button in the navbar to switch between light and dark
          themes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground">
            Card Example
          </h2>
          <p className="text-card-foreground">
            This card demonstrates how different elements adapt to theme
            changes.
          </p>
        </div>

        <div className="p-6 border border-border rounded-lg bg-secondary">
          <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">
            Secondary Card
          </h2>
          <p className="text-secondary-foreground">
            Secondary backgrounds and text colors also adapt to themes.
          </p>
        </div>
      </div>

      <div className="p-6 border border-border rounded-lg bg-muted">
        <h2 className="text-2xl font-bold mb-4 text-muted-foreground">
          Muted Section
        </h2>
        <p className="text-muted-foreground mb-4">
          Muted backgrounds provide subtle contrast and are perfect for
          secondary content.
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90">
            Primary Button
          </button>
          <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80">
            Secondary Button
          </button>
          <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90">
            Destructive Button
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground">
        <p>Try switching themes using the toggle button in the navbar!</p>
      </div>
    </div>
  );
}
