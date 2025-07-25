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
      title: "Enhanced Team Communication",
      description:
        "Streamline your team's communication with real-time messaging, file sharing, and collaborative workspaces.",
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Intelligent Task Management",
      description:
        "AI-powered task prioritization and automated workflow management to keep your projects on track.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Gain insights into team performance and project progress with comprehensive analytics and reporting.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Enterprise Security",
      description:
        "Bank-level security with end-to-end encryption and compliance with industry standards.",
    },
  ];
  return (
    <div>
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="lg:text-4xl text-3xl font-semibold mb-4">
              Enhanced Team Communication
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything your team needs to collaborate effectively and deliver
              exceptional results.
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
