import {
  BarChart3,
  Calendar,
  CheckCircle,
  MessageSquare,
  Shield,
} from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Community & Discussions",
      description:
        "Engage with peers and instructors in real-time through interactive discussions, Q&A forums, and peer feedback.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Flexible Learning Paths",
      description:
        "Learn at your own pace with structured modules, milestone tracking, and personalized course progression.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress & Performance Analytics",
      description:
        "Track your learning journey with detailed analytics, completion rates, and performance insights.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Scalable Platform",
      description:
        "A self-hosted solution with enterprise-grade security, ensuring full control of your data and user access.",
    },
  ];

  return (
    <div>
      <section id="features" className="pt-20 pb-6 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)]">
              Platform Features Designed for Modern Learning
            </h2>
            <p className="lg:text-lg text-base mt-2 text-muted-foreground max-w-xl mx-auto">
              Discover powerful tools that empower individuals and teams to
              learn.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
