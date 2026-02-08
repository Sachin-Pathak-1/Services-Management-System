import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const planFeatures = {
  Basic: ["Haircut", "Basic Facial", "Hair Wash", "15 min Head Massage"],
  Standard: [
    "Haircut & Styling",
    "Cleanup / Facial",
    "Hair Spa",
    "30 min Head Massage",
    "Manicure or Pedicure",
  ],
  Premium: [
    "Haircut & Styling",
    "Advanced Facial",
    "Hair Spa",
    "Full Body Massage",
    "Manicure & Pedicure",
    "Spa Treatment",
  ],
};

export function ViewPlan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [branchCount, setBranchCount] = useState(1);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [loadError, setLoadError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [selectionInfo, setSelectionInfo] = useState(null);
  const [salonsAddedCount, setSalonsAddedCount] = useState(0);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadError("");
        const [plansRes, selectionRes, salonsRes] = await Promise.all([
          api.get("/plans"),
          api.get("/plans/selection"),
          api.get("/salons/get")
        ]);

        const planList = plansRes.data || [];
        setPlans(Array.isArray(planList) ? planList : []);

        const salonsList = salonsRes.data || [];
        setSalonsAddedCount(Array.isArray(salonsList) ? salonsList.length : 0);

        if (selectionRes?.data?.selectedPlan) {
          setSelectedPlanId(selectionRes.data.selectedPlan._id);
          setBranchCount(
            Math.max(
              selectionRes.data.salonLimit > 0
                ? selectionRes.data.salonLimit
                : 1,
              selectionRes.data.salonsAdded || 1
            )
          );
          setSelectionInfo(selectionRes.data);
        } else {
          setSelectionInfo(null);
        }
      } catch (err) {
        setPlans([]);
        setLoadError("Failed to load plans. Please check the API.");
      }
    };

    fetchPlans();
  }, []);

  const selectedPlan = useMemo(
    () => plans.find((plan) => plan._id === selectedPlanId) || null,
    [plans, selectedPlanId]
  );

  const totalPrice = useMemo(() => {
    if (!selectedPlan) return 0;
    const pricePerBranch = Number(selectedPlan.price) || 0;
    return pricePerBranch * branchCount;
  }, [selectedPlan, branchCount]);

  const isBranchCountValid = (plan) => {
    if (!plan) return false;
    if (!plan.maxBranches || plan.maxBranches === 0) return true;
    return branchCount <= plan.maxBranches;
  };

  const formatCurrency = (value) => `Rs. ${value.toFixed(2)}`;

  const handleSelectPlan = async (plan) => {
    console.log("Attempting to select plan", plan._id, "with branch count", branchCount);
    if (!isBranchCountValid(plan)) {
      setSaveMessage(`Max ${plan.maxBranches} salons allowed for this plan.`);
      return;
    }

    const salonsAdded = selectionInfo?.salonsAdded ?? salonsAddedCount ?? 0;
    if (salonsAdded > branchCount) {
      setSaveMessage("Branch count cannot be less than salons already added.");
      return;
    }

    try {
      setSaveMessage("");
      console.log("Sending POST to /plans/select");
      const res = await api.post("/plans/select", {
        planId: plan._id,
        branchCount
      });
      console.log("Response from select", res.data);

      setSelectedPlanId(plan._id);
      console.log("Set selectedPlanId to", plan._id);
      const [selectionRes, salonsRes] = await Promise.all([
        api.get("/plans/selection"),
        api.get("/salons/get")
      ]);
      console.log("Selection response", selectionRes.data);
      setSelectionInfo(selectionRes.data || null);
      const salonsList = salonsRes.data || [];
      setSalonsAddedCount(Array.isArray(salonsList) ? salonsList.length : 0);
      setSaveMessage("Plan saved successfully.");
    } catch (err) {
      console.log("Error selecting plan", err.response?.data || err);
      setSaveMessage(
        err?.response?.data?.message || "Failed to save plan selection."
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf4f8] px-4 py-10">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <button
          onClick={() => navigate(-1)}
          className="text-purple-700 font-medium mb-4 hover:underline"
        >
          - Back to Services
        </button>

        <h1 className="text-4xl font-serif font-bold text-gray-900">
          Salon Membership Plans
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Choose a plan that suits your beauty needs and indulge in premium
          salon services.
        </p>
      </div>

      {/* Branch Count */}
      <div className="max-w-6xl mx-auto mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Number of salons to add
        </label>
        <div className="flex flex-wrap gap-4 items-center">
          <input
            type="number"
            min={1}
            value={branchCount}
            onChange={(e) => setBranchCount(Math.max(1, Number(e.target.value) || 1))}
            className="w-36 rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
          />
          {selectedPlan && (
            <div className="text-sm text-gray-700">
              Total for {selectedPlan.name}:{" "}
              <span className="font-semibold text-purple-700">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          )}
        </div>
        {selectionInfo?.selectedPlan && (
          <div className="mt-3 text-sm text-gray-700">
            Current selection:{" "}
            <span className="font-semibold text-purple-700">
              {selectionInfo.selectedPlan.name}
            </span>
            {" "}· Salons added: {selectionInfo.salonsAdded}
            {" "}· Remaining: {selectionInfo.salonsRemaining}
          </div>
        )}
        {saveMessage && (
          <div className="mt-3 text-sm text-blue-700">
            {saveMessage}
          </div>
        )}
      </div>

      {loadError && (
        <div className="max-w-6xl mx-auto mb-6 text-sm text-red-600">
          {loadError}
        </div>
      )}

      {/* Plans */}
      <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className={`rounded-2xl bg-white p-6 shadow-md border
              ${
                plan.name === "Standard"
                  ? "border-purple-600 scale-105"
                  : "border-gray-200"
              }`}
          >
            {plan.name === "Standard" && (
              <span className="inline-block mb-3 rounded-full bg-purple-100 px-4 py-1 text-sm font-semibold text-purple-700">
                Most Popular
              </span>
            )}

            <h2 className="text-2xl font-serif font-bold text-gray-900">
              {plan.name}
            </h2>
            <p className="text-gray-500 mt-1">{plan.description}</p>

            <div className="mt-4 text-3xl font-bold text-purple-700">
              {formatCurrency(Number(plan.price) || 0)}
              <span className="block text-sm font-medium text-gray-500">
                per salon
              </span>
            </div>

            <ul className="mt-6 space-y-3 text-gray-700">
              {(planFeatures[plan.name] || ["Core salon services"]).map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-purple-600"></span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(plan)}
              disabled={!isBranchCountValid(plan)}
              className={`mt-8 w-full rounded-xl py-3 font-semibold transition
                ${
                  plan.name === "Standard"
                    ? "bg-purple-700 text-white hover:bg-purple-800"
                    : "border border-purple-700 text-purple-700 hover:bg-purple-50"
                }`}
            >
              {isBranchCountValid(plan)
                ? selectedPlanId === plan._id
                  ? "Selected"
                  : "Choose Plan"
                : `Max ${plan.maxBranches} salons`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
