"use client";

import { useState } from "react";

import { useLanguage } from "@/components/LanguageProvider";

const FAQS = [
  {
    q: "Do I need to prepare anything before we speak?",
    qGr: "Χρειάζεται να προετοιμάσω κάτι πριν μιλήσουμε;",
    a: "No preparation is needed. The introductory consultation is an informal conversation, and there are no right or wrong things to say. We can begin with whatever feels most important to you.",
    aGr: "Δεν χρειάζεται καμία προετοιμασία. Η εισαγωγική γνωριμία είναι μια ανεπίσημη συζήτηση και δεν υπάρχουν σωστά ή λάθος πράγματα να πεις. Μπορούμε να ξεκινήσουμε από ό,τι σου φαίνεται πιο σημαντικό.",
  },
  {
    q: "How do online sessions work?",
    qGr: "Πώς λειτουργούν οι διαδικτυακές συνεδρίες;",
    a: "Sessions take place via a secure video platform. You'll need a stable internet connection and a private space where you feel comfortable speaking freely. You can join from your computer, tablet or phone.",
    aGr: "Οι συνεδρίες γίνονται μέσω ασφαλούς πλατφόρμας βίντεο. Θα χρειαστείς μια σταθερή σύνδεση στο διαδίκτυο και έναν ιδιωτικό χώρο όπου νιώθεις άνετα να μιλήσεις ελεύθερα. Μπορείς να συνδεθείς από υπολογιστή, tablet ή κινητό.",
  },
  {
    q: "What if I'm not sure therapy is right for me?",
    qGr: "Κι αν δεν είμαι σίγουρος ότι η θεραπεία είναι για μένα;",
    a: "You don't need to be certain before getting in touch. The introductory consultation gives us a chance to talk about what brings you to counselling, answer any questions, and consider whether working together feels right. There is no commitment to continue.",
    aGr: "Δεν χρειάζεται να είσαι σίγουρος πριν επικοινωνήσεις. Η εισαγωγική γνωριμία μάς δίνει την ευκαιρία να μιλήσουμε για το τι σε φέρνει στη συμβουλευτική, να απαντηθούν τυχόν ερωτήσεις και να σκεφτούμε αν η συνεργασία μας είναι η κατάλληλη. Δεν υπάρχει καμία δέσμευση να συνεχίσεις.",
  },
  {
    q: "Is everything confidential?",
    qGr: "Είναι όλα εμπιστευτικά;",
    a: "What you share in counselling is treated as confidential and handled in accordance with BACP ethical guidelines. There are some limited circumstances where confidentiality may need to be broken, for example where there is a serious concern about safety or where disclosure is required by law. Wherever possible, I would discuss this with you first.",
    aGr: "Όσα μοιράζεσαι στη συμβουλευτική αντιμετωπίζονται ως εμπιστευτικά και τηρούνται σύμφωνα με τις δεοντολογικές κατευθύνσεις του BACP. Υπάρχουν ορισμένες περιορισμένες περιπτώσεις όπου η εμπιστευτικότητα μπορεί να χρειαστεί να αρθεί, για παράδειγμα όταν υπάρχει σοβαρή ανησυχία για την ασφάλεια ή όταν η γνωστοποίηση απαιτείται από τον νόμο. Όπου είναι εφικτό, θα το συζητούσα πρώτα μαζί σου.",
  },
  {
    q: "Can I reschedule or cancel?",
    qGr: "Μπορώ να αλλάξω ή να ακυρώσω το ραντεβού;",
    a: "Yes. Sessions can be rescheduled or cancelled with at least 48 hours' notice. Cancellations made with less than 48 hours' notice will be charged at the full session fee. The cancellation policy will be explained and agreed before counselling begins.",
    aGr: "Ναι. Οι συνεδρίες μπορούν να μετατεθούν ή να ακυρωθούν με προειδοποίηση τουλάχιστον 48 ωρών. Ακυρώσεις με λιγότερο από 48 ώρες προειδοποίηση χρεώνονται στο πλήρες κόστος της συνεδρίας. Η πολιτική ακυρώσεων θα εξηγηθεί και θα συμφωνηθεί πριν ξεκινήσει η συμβουλευτική.",
  },
  {
    q: "How often will we meet?",
    qGr: "Πόσο συχνά θα συναντιόμαστε;",
    a: "Sessions are usually weekly, at a regular time agreed together. We can discuss what is appropriate for you during the introductory consultation and review this as the work progresses.",
    aGr: "Οι συνεδρίες είναι συνήθως εβδομαδιαίες, σε μια σταθερή ώρα που συμφωνούμε μαζί. Μπορούμε να συζητήσουμε τι είναι κατάλληλο για σένα στην εισαγωγική γνωριμία και να το επανεξετάσουμε καθώς προχωρά η δουλειά.",
  },
  {
    q: "How many sessions will I need?",
    qGr: "Πόσες συνεδρίες θα χρειαστώ;",
    a: "There is no fixed number of sessions. Some people come to counselling for a shorter period, while others choose to work for longer. We can review how the work is going together and discuss when ending feels appropriate.",
    aGr: "Δεν υπάρχει προκαθορισμένος αριθμός συνεδριών. Κάποιοι έρχονται στη συμβουλευτική για μικρότερο διάστημα, ενώ άλλοι επιλέγουν να δουλέψουν για περισσότερο. Μπορούμε να επανεξετάζουμε μαζί πώς πηγαίνει η δουλειά και να συζητήσουμε πότε η ολοκλήρωση φαίνεται κατάλληλη.",
  },
  {
    q: "Do you work with everyone?",
    qGr: "Δουλεύεις με όλους;",
    a: "The introductory consultation gives us an opportunity to consider whether my experience and way of working are appropriate for what you are looking for. If I feel that another professional or service would be better placed to support you, I will be open about this and, where possible, help you consider other options.",
    aGr: "Η εισαγωγική γνωριμία μάς δίνει την ευκαιρία να δούμε αν η εμπειρία μου και ο τρόπος που δουλεύω ταιριάζουν σε αυτό που αναζητάς. Αν θεωρήσω ότι κάποιος άλλος επαγγελματίας ή κάποια άλλη υπηρεσία θα μπορούσε να σε στηρίξει καλύτερα, θα είμαι ειλικρινής γι' αυτό και, όπου είναι εφικτό, θα σε βοηθήσω να εξετάσεις άλλες επιλογές.",
  },
] as const;

export function BookingFaq() {
  const { language } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {FAQS.map((item, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
            aria-expanded={open === i}
          >
            <span className="font-light text-foreground/90 text-base">
              {language === "gr" ? item.qGr : item.q}
            </span>
            <span
              className={`shrink-0 text-accent transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
              aria-hidden
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="8" y1="1" x2="8" y2="15" />
                <line x1="1" y1="8" x2="15" y2="8" />
              </svg>
            </span>
          </button>
          {/* Answers run long (confidentiality, cancellations), so the open
              state needs headroom well past the tallest one. */}
          <div
            className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[36rem] pb-5" : "max-h-0"}`}
          >
            <p className="text-sm font-light leading-relaxed text-muted-foreground">
              {language === "gr" ? item.aGr : item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
