
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StepProps {
  title: string;
  children: React.ReactNode;
}

const Step: React.FC<StepProps> = ({ children }) => {
  return <div className="step">{children}</div>;
};

interface StepWizardProps {
  children: React.ReactElement<StepProps>[];
  onComplete: () => void;
  onCancel?: () => void;
}

const StepWizard: React.FC<StepWizardProps> = ({ children, onComplete, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement<StepProps>[];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (onCancel) {
      onCancel();
    }
  };

  const currentTitle = steps[currentStep].props.title;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{currentTitle}</h2>
        <Progress value={progress} className="mt-4" />
      </div>
      
      <div className="p-6">
        {steps[currentStep]}
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <Button 
          variant="ghost" 
          onClick={goToPreviousStep}
        >
          {currentStep === 0 && onCancel ? "Cancel" : "Back"}
        </Button>
        
        <Button 
          onClick={goToNextStep}
        >
          {isLastStep ? "Complete" : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export { StepWizard, Step };
