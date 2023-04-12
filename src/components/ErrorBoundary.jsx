import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <p style={{ color: "red" }}>something went wrong</p>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
