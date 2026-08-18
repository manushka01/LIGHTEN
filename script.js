// ====== CONFIG ======
const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : ""; // set your deployed backend URL here in production

// UK phone numbers: local "0XXXXXXXXXX" (11 digits) or international "+44XXXXXXXXXX" (44 + 10 digits)
function isValidUKPhone(value) {
  const cleaned = value.replace(/[\s\-().]/g, "");
  return /^(?:\+44|0044|0)\d{10}$/.test(cleaned);
}

// ====== LADDER ANIMATION ======
window.addEventListener("DOMContentLoaded", () => {
  const afterFill = document.getElementById("afterFill");
  const afterVal = document.getElementById("afterVal");
  if (afterFill) {
    setTimeout(() => {
      afterFill.style.width = "19%";
      let n = 0;
      const target = 19;
      const step = () => {
        n += 1;
        afterVal.textContent = Math.min(n, target) + "%";
        if (n < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, 300);
  }
});

// ====== SOLUTIONS DATA ======
const solutions = [
  {
    id: "dmp", name: "Debt Management Plan",
    body: "An informal repayment agreement between you and your creditors to pay off your debts through one affordable monthly payment.",
    pros: ["One affordable payment each month", "Flexible if your circumstances change", "Interest & charges may be frozen", "Avoids formal insolvency"],
    cons: ["All creditors must agree individually", "Freezing interest isn't guaranteed", "Affects your credit file for up to 6 years"]
  },
  {
    id: "iva", name: "IVA",
    body: "A legally binding agreement to repay what you can afford over a set period, typically 5–6 years, with remaining unsecured debt written off at the end.",
    pros: ["Legally protects you from creditor action", "Interest & charges are frozen", "Remaining debt written off on completion", "Support from a dedicated team"],
    cons: ["Creditors don't have to agree to the proposal", "Affects your credit file for 6 years", "Recorded on the public insolvency register"]
  },
  {
    id: "ao", name: "Administration Order",
    body: "A County Court order for people with debts under £5,000 who've had at least one court judgment against them.",
    pros: ["No upfront cost", "Just one monthly payment into court", "Your home isn't at risk"],
    cons: ["Only available if debt is below £5,000", "Recorded on a public register", "Credit rating is affected"]
  },
  {
    id: "dro", name: "Debt Relief Order",
    body: "A formal solution for people with little spare income or assets and debts under £50,000.",
    pros: ["No monthly payments required", "Usually lasts 12 months", "Creditors must stop taking action", "Simple to set up"],
    cons: ["Affects credit file for 6 years", "Owning assets over £4,000 disqualifies you", "Recorded on a public register"]
  },
  {
    id: "bankruptcy", name: "Bankruptcy",
    body: "A formal insolvency route where qualifying debts are written off, usually within 12 months.",
    pros: ["Can be discharged within 12 months", "Frees you from creditor pressure", "Qualifying debts are written off", "Process is completed online"],
    cons: ["You may lose control of assets", "Affects credit file for 6 years", "Costs £680, can be paid in instalments"]
  },
  {
    id: "breathing-space", name: "Breathing Space",
    body: "Temporary legal protection from creditors while you get debt advice — freezes interest and pauses enforcement action.",
    pros: ["Freezes most interest, fees & charges", "Pauses enforcement & creditor contact", "Standard option lasts up to 60 days"],
    cons: ["Only a temporary pause, not a solution", "Must be arranged through debt advice", "Doesn't reduce what you owe"]
  },
  {
    id: "scottish", name: "Scottish Solutions",
    body: "Options such as a Minimal Assets Process (MAP) or Trust Deed, designed specifically for residents of Scotland.",
    pros: ["Debts written off once discharged", "Creditor contact stops once in place", "Lower fees for low-income applicants"],
    cons: ["Only available if you live in Scotland", "Credit rating affected", "Recorded on the Register of Insolvencies"]
  },
  {
    id: "consolidation", name: "Consolidation Loan",
    body: "Combines multiple debts into a single loan, sometimes at a lower interest rate, so you make one payment instead of several.",
    pros: ["Simplifies multiple payments into one", "May offer a lower interest rate", "No formal insolvency involved"],
    cons: ["Requires you to still qualify for credit", "Introductory rates may rise later", "Doesn't reduce total debt owed"]
  }
];

function renderAccordion() {
  const el = document.getElementById("accordion");
  if (!el) return;

  solutions.forEach((s, i) => {
    const item = document.createElement("div");
    item.className = "acc-item" + (i === 0 ? " open" : "");
    item.innerHTML = `
      <button class="acc-head" type="button">
        <span>${s.name}</span>
        <span class="plus">+</span>
      </button>
      <div class="acc-body">
        <div class="acc-body-inner">
          <p>${s.body}</p>
          <div class="pros-cons">
            <div class="pros"><h4>Pros</h4><ul>${s.pros.map(p => `<li>${p}</li>`).join("")}</ul></div>
            <div class="cons"><h4>Cons</h4><ul>${s.cons.map(c => `<li>${c}</li>`).join("")}</ul></div>
          </div>
        </div>
      </div>`;
    el.appendChild(item);

    const head = item.querySelector(".acc-head");
    const body = item.querySelector(".acc-body");
    head.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      // close all
      el.querySelectorAll(".acc-item").forEach(other => {
        other.classList.remove("open");
        other.querySelector(".acc-body").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        body.style.maxHeight = body.scrollHeight + "px";
      }
    });

    if (i === 0) {
      requestAnimationFrame(() => { body.style.maxHeight = body.scrollHeight + "px"; });
    }
  });
}

renderAccordion();

// ====== MULTI-STEP LEAD FORM (same logic/fields as main site, different indicator UI) ======
const form = document.getElementById("leadForm");
const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "success"];
let currentStepIndex = 0;
const answers = {
  debtAmount: "",
  employment: "",
  goal: "",
  worriedDebt: "",
  concern: "",
  property: "",
  location: ""
};

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const stepDots = document.querySelectorAll(".step-dot");

document.querySelectorAll(".option-grid").forEach(grid => {
  const field = grid.dataset.field;
  grid.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", () => {
      grid.querySelectorAll(".option").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      answers[field] = btn.dataset.value;
    });
  });
});

function updateStepDots(index) {
  stepDots.forEach((dot, i) => {
    dot.classList.remove("active", "done");
    if (i < index) dot.classList.add("done");
    else if (i === index) dot.classList.add("active");
  });
}

function showStep(index) {
  document.querySelectorAll(".form-step").forEach(elm => elm.classList.remove("active"));
  const stepKey = steps[index];
  document.querySelector(`.form-step[data-step="${stepKey}"]`).classList.add("active");

  const nav = document.querySelector(".form-nav");
  const indicator = document.getElementById("stepIndicator");
  const isSpecialStep = stepKey === "8" || stepKey === "9" || stepKey === "success";

  backBtn.style.display = (index === 0 || isSpecialStep) ? "none" : "inline-block";
  nav.style.display = isSpecialStep ? "none" : "flex";

  if (isSpecialStep) {
    indicator.style.display = "none";
  } else {
    indicator.style.display = "flex";
    updateStepDots(index);
  }
}

function currentStepValid() {
  const stepKey = steps[currentStepIndex];
  if (stepKey === "1") return !!answers.debtAmount;
  if (stepKey === "2") return !!answers.employment;
  if (stepKey === "3") return !!answers.goal;
  if (stepKey === "4") return !!answers.worriedDebt;
  if (stepKey === "5") return !!answers.concern;
  if (stepKey === "6") return !!answers.property;
  if (stepKey === "7") return !!answers.location;
  return true;
}

nextBtn.addEventListener("click", () => {
  if (!currentStepValid()) {
    alert("Please select an option to continue.");
    return;
  }
  if (currentStepIndex < steps.length - 2) {
    currentStepIndex++;
    showStep(currentStepIndex);
  }
});

backBtn.addEventListener("click", () => {
  if (currentStepIndex > 0) {
    currentStepIndex--;
    showStep(currentStepIndex);
  }
});

// Back icon buttons on steps 8 and 9
document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      showStep(currentStepIndex);
    }
  });
});

// Step 8 -> Step 9: validate contact details, personalize name, move on
const detailsContinueBtn = document.getElementById("detailsContinueBtn");
if (detailsContinueBtn) {
  detailsContinueBtn.addEventListener("click", () => {
    const nameVal = form.fullName.value.trim();
    const emailVal = form.email.value.trim();
    const postcodeVal = form.postcode.value.trim();

    if (!nameVal || !emailVal || !postcodeVal) {
      alert("Please fill in your name, email and postcode to continue.");
      return;
    }
    if (!form.email.checkValidity()) {
      alert("Please enter a valid email address.");
      return;
    }

    const leadFirstNameEl = document.getElementById("leadFirstName");
    if (leadFirstNameEl) {
      const firstName = nameVal.split(" ")[0];
      leadFirstNameEl.textContent = firstName + ",";
    }

    currentStepIndex = steps.indexOf("9");
    showStep(currentStepIndex);
  });
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const phoneVal = form.phone.value.trim();
  if (!isValidUKPhone(phoneVal)) {
    alert("Please enter a valid UK phone number (e.g. 07700 900000 or +44 7700 900000).");
    form.phone.focus();
    return;
  }

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting...";

  const payload = {
    fullName: form.fullName.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim(),
    postcode: form.postcode.value.trim(),
    debtAmount: answers.debtAmount,
    employment: answers.employment,
    goal: answers.goal,
    worriedDebt: answers.worriedDebt,
    concern: answers.concern,
    property: answers.property,
    location: answers.location,
    source: "lighten-website",
    submittedAt: new Date().toISOString()
  };

  try {
    const res = await fetch(`${API_BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Request failed");

    currentStepIndex = steps.length - 1;
    showStep(currentStepIndex);
  } catch (err) {
    console.error(err);
    alert("Sorry, something went wrong submitting your details. Please try again or call us directly.");
    submitBtn.disabled = false;
    submitBtn.textContent = "Check If I Qualify";
  }
});

showStep(0);
