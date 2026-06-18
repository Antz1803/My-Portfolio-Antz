import emailjs from "@emailjs/browser";
import { ContactData } from "../Models/ContactModel";

export const useContactController = () => {
    const viewModel = ContactData;

    const handleLinkedIn = () => {
        window.open(viewModel.socialLinks[0].url, "_blank");
    };

    const handleGitHub = () => {
        window.open(viewModel.socialLinks[1].url, "_blank");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.sendForm(
            "service_sujhkeh",
            "template_71fa6ds",
            e.target,
            "uOVaI8FodN7H7xSZ_"
        ).then(
            () => {
                alert("Message sent successfully!");
                e.target.reset();
            },
           (error) => {
                console.log("EMAILJS FULL ERROR:", error);
                alert(error?.text || "Failed to send message");
            }
        );
    };

    return {
        viewModel,
        handleLinkedIn,
        handleGitHub,
        handleSubmit
    };
};