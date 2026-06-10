import { Component, type ReactNode } from "react";
import SceneFallback from "./SceneFallback";

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class SceneErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): State { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <SceneFallback />;
    return this.props.children;
  }
}
