import { Injectable } from '@angular/core';

export interface CancellationPolicy {
  value: string;
  title: string;
  desc: string;
}

@Injectable({
  providedIn: 'root',
})
export class CancellationService {
  public cancellationPolicies: CancellationPolicy[] = [
    {
      value: 'cancel_policy_standard_1',
      title: 'Flexible',
      desc: 'Guest get a full refund they cancel up to a day before check-in.',
    },
    {
      value: 'cancel_policy_standard_2',
      title: 'Moderate',
      desc: 'Guest get a full refund if they cancel up to 5 days before check-in.',
    },
    {
      value: 'cancel_policy_standard_3',
      title: 'Firm',
      desc: 'Guest get a full refund if they cancel up to 30 days before check-in, except in certain cases.',
    },
    {
      value: 'cancel_policy_standard_4',
      title: 'Strict',
      desc: 'Guest get a full refund if they cancel within 48 hours of booking and at least 14 days before check-in.',
    },
    {
      value: 'cancel_policy_lt_1',
      title: 'Firm',
      desc: 'Full refund up to 30 days before check-in. After that, the first 30 days of the stay are non-refundable.',
    },
    {
      value: 'cancel_policy_lt_2',
      title: 'Strict',
      desc: 'Full refund if cancelled within 48 hours of booking and at least 28 days before check-in. After that, the first 30 days of the stay are non-refundable.',
    },
  ];

  constructor() {}

  getPolicy(value: string): CancellationPolicy {
    return this.cancellationPolicies.find(
      (e: CancellationPolicy) => e.value === value
    ) as CancellationPolicy;
  }

  getPolicyTitle(value: string): string {
    return this.cancellationPolicies.find(
      (e: CancellationPolicy) => e.value === value
    )?.title as string;
  }

  getPolicyDesc(value: string): string {
    return this.cancellationPolicies.find(
      (e: CancellationPolicy) => e.value === value
    )?.desc as string;
  }
}
