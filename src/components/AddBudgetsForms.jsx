import { CurrencyDollarIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";

const AddBudgetsForms = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset(); // Invoke reset as a function
      focusRef.current.focus(); // Invoke focus as a function
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budgets</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount"></label>
          <input
            type="number"
            name="newBudgetAmount"
            id="newBudgetAmount"
            step="0.01"
            required
            placeholder="e.g., 300$"
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createBudget" />
        <button type="submit" className="btn btn--dart" disabled={isSubmitting}>
          {
            isSubmitting ? (
              <span>Submitting budget...</span>
            ) : (
              <>
                <span>Create budget</span>
                <CurrencyDollarIcon width={20} />
              </>
            )

            // <CurrencyDollarIcon width={20} />
          }
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetsForms;
