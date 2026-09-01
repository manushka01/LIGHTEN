const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "";
function isValidUKPhone(value) {
  const cleaned = value.replace(/[\s\-().]/g, "");

 
  return /^(?:07\d{9}|\+447\d{9}|00447\d{9})$/.test(cleaned);
}

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

const solutions = [
  {
    id: "dmp", name: "Debt Management Plan",
    body: "A Debt Management Plan is an informal repayment agreement between you and your creditors to pay all of your debts,Debt management plans are an alternative debt solution to formal arrangements, such as an Individual Voluntary Arrangement or Bankruptcy and available to residents in the United Kingdom.",
    pros: ["You only pay one affordable payment to the DMP company", "The payment is flexible depending on your circumstances, it can increase or decrease", "Payments can be reduced & interest rates can be frozen by creditors, however, they are not obliged to do this", "Some charities & organisations provide this service free of charge (you can contact the Money Advice Service for more information)"],
    cons: ["All the creditors need to agree to their individual arrangement for this plan to be effective", "Interest & charges are not guaranteed to be frozen", "Your credit rating is affected as your monthly payments are not contractual","Debt management plans can affect your credit file for a minimum of 6 years, as in most cases you will have defaulted on the original credit agreement terms once you enter into the arrangement"]
  },
 {
    id: "iva", name: "IVA",

    body: "An IVA (Individual Voluntary Arrangement) is a legally binding agreement between you and your creditors to pay back your debts over a period of time. You agree to make regular payments to an insolvency practitioner, who will divide this money between your creditors. The fees charged are taken from the affordable monthly payment you make over the agreed term of the IVA. An IVA can give you more control of your assets than bankruptcy.",

    pros: [
      "One realistic and affordable payment over a set period of time",
      "After successful completion of your IVA unaffordable debt is written off",
      "Protected legally — after approval, no further action can be taken by creditors and all interest and charges are frozen",
      "The fees charged are taken from the affordable monthly payment you make over the agreed term",
      "Interest and charges will stop",
      "Support from our team who can help you through the journey",
      "Your expenditure will be reviewed at the start and annually to ensure your payment remains affordable"
    ],

    cons: [
      "There are restrictions on the expenditure of a person who enters into an IVA",
      "Creditors don't have to agree to an IVA proposal so it's not guaranteed",
      "It affects your credit file for six years",
      "Your information will be held on the public insolvency register",
      "There are costs involved with an IVA, deducted from your contributions and detailed fully in your IVA proposal",
      "If you own property, you may be asked to release equity to pay off debts — a remortgage may attract higher interest, or the IVA may be extended by 12 months if none is available",
      "If your IVA fails, it may result in Bankruptcy",
      "If you earn additional income, a percentage of this may need to be paid into the IVA",
      "Only unsecured debts included within the arrangement may be discharged; unsecured debts not included remain outstanding",
      "Borrowing any amount over £500 can only be done with the express permission of the Insolvency Practitioner"
    ]
},
  {
    id: "ao", name: "Administration Order",

    body: "Administration orders are arranged by the County Court. Administration orders are only available in England, Wales and Northern Ireland. If you live in Scotland there are other options available to help you deal with your debts. An administration order is legally binding on your creditors and gives you protection from them. The creditors included in the order can't contact you for payment or add any more interest or charges to your debts once the administration order has been approved. To apply for an administration order you need to have less than £5,000 debt in total and have received at least one court judgment.",

    pros: [
      "There is no upfront cost to you",
      "You make just one monthly payment into court",
      "Your home is not at risk"
    ],

    cons: [
      "The debt must be below £5,000",
      "You may have to sell valuable possessions",
      "Your details are recorded on a Public Register",
      "Your credit rating will be adversely affected",
      "The order will be listed on a public insolvency register"
    ]
},
  {
    id: "dro", name: "Debt Relief Order",

    body: "Debt Relief Orders (DRO) is a formal debt solution designed for people with little or no assets and low income. If you don't own your own home & have little spare income and debts that are less than £50,000 a Debt Relief Order (DRO) could be a way to deal with your debts. It is an alternative debt solution to Bankruptcy or an Individual Voluntary Arrangement and available to residents of England, Wales and Northern Ireland.",

    pros: [
      "Typically a Debt Relief Order lasts twelve months",
      "Debt Relief Orders don't require you to make payments into them",
      "Creditors are stopped from taking any further action against you",
      "A Debt Relief Order is relatively simple process to start and can be done through various charity organisations"
    ],

    cons: [
      "Your credit rating will be affected for six years",
      "Owning your own property or having assets over £4,000 will stop you entering into a Debt Relief Order",
      "A Debt Relief Order may be cancelled if you do not comply or if your circumstances change during the 12 month period, for example if you're able to make payments towards you debt(s)",
      "Entering into a DRO will be recorded on a public register",
      "If you can afford more than £100 after your monthly essentials have been budgeted for then you will not qualify"
    ]
},
  {
    id: "bankruptcy", name: "Bankruptcy",

    body: "If you are unable to pay your debts you can apply to make yourself bankrupt. Bankruptcy is a formal insolvency route and can have serious financial implications. Other people can put you into bankruptcy or you can make this choice yourself. It's something to be carefully considered. The three ways you can go bankrupt are: you apply for bankruptcy yourself; an application for bankruptcy from a creditor; by the IVA Supervisor if you fail to meet the terms of your IVA.",

    pros: [
      "Your Bankruptcy could be discharged within 12 months",
      "It can free you from the pressure from creditors",
      "All debts that qualify for bankruptcy are written off",
      "The stigma of bankruptcy is not what it once was",
      "The process to make yourself bankrupt is now completed online"
    ],

    cons: [
      "You lose control of finances and assets, the official receiver or Trustee appointed on your case will decide what happens to your valuable asset and finances. Your information will be held on a public register",
      "Under certain circumstances, bankruptcy can affect types of employment",
      "It will affect your credit file for six years",
      "Putting yourself into bankruptcy will cost £680, this can be paid in monthly instalments however you will not be afforded the protection of bankruptcy until such time as this is paid",
      "Depending on if you have proven disposable income and employment status, you may have to pay income payments for up to thirty-six months"
    ]
},
 {
    id: "breathing-space", name: "Breathing Space",

    body: "Breathing Space is a new debt option that gives you temporary protection from the creditors you owe money to if you're struggling with debts. This includes freezing most interest, fees and charges on debts, and pausing most enforcement action and contact from creditors. There are two types of Breathing Space: Standard Breathing Space, which you apply for through debt advice and which lasts for up to 60 days, with a review between days 25 and 35. Mental Health Crisis Breathing Space, which is specifically for people in mental health crisis treatment and can only be applied for with an Approved Mental Health Professional (AMHP). It lasts for the duration of your treatment, plus 30 days.",

    pros: [
      "Freezes most interest, fees and charges on debts",
      "Pauses most enforcement action and contact from creditors",
      "Standard Breathing Space lasts up to 60 days",
      "Mental Health Crisis Breathing Space lasts for duration of treatment plus 30 days"
    ],

    cons: [
      "Only a temporary pause, not a permanent debt solution",
      "Standard type must be arranged through debt advice",
      "Mental Health Crisis type can only be applied for via an Approved Mental Health Professional (AMHP)",
      "Doesn't reduce the amount you owe"
    ]
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

document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      showStep(currentStepIndex);
    }
  });
});

const detailsContinueBtn = document.getElementById("detailsContinueBtn");
if (detailsContinueBtn) {
  detailsContinueBtn.addEventListener("click", () => {
    const nameVal = form.fullName.value.trim();
    const emailVal = form.email.value.trim();

    if (!nameVal || !emailVal) {
      alert("Please fill in your name and email to continue.");
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
