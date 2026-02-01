import { ExternalLink, Code2, Calculator, Globe, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Resource } from "@shared/schema";

interface ResourceCardProps {
  resource: Resource;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
  const isMath = resource.category === 'math';
  const isApp = resource.type === 'app';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative flex flex-col h-full bg-card hover:bg-accent/5 rounded-2xl border border-border/50 hover:border-primary/20 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-40 w-full overflow-hidden bg-secondary/30">
        {resource.imageUrl ? (
          <img 
            src={resource.imageUrl} 
            alt={resource.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {isMath ? (
              <Calculator className="h-12 w-12 text-primary/20" />
            ) : (
              <Code2 className="h-12 w-12 text-accent/20" />
            )}
          </div>
        )}
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur text-xs font-semibold shadow-sm">
            {isApp ? <Smartphone className="w-3 h-3 mr-1" /> : <Globe className="w-3 h-3 mr-1" />}
            {resource.type === 'website' ? 'Web' : 'App'}
          </Badge>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className={`${isMath ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-purple-600 border-purple-200 bg-purple-50'} text-xs uppercase tracking-wider`}>
            {resource.category}
          </Badge>
        </div>
        
        <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
          {resource.description}
        </p>

        <Button 
          className="w-full mt-auto bg-muted hover:bg-primary hover:text-white text-foreground font-semibold transition-all duration-300"
          onClick={() => window.open(resource.url, '_blank')}
        >
          <span>Visit Resource</span>
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
