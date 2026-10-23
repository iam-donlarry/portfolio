'use client';

class VoidAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private gainNode: GainNode | null = null;

  public init() {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // Web Audio not supported
    }
  }

  public toggle(): boolean {
    if (!this.ctx) this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      this.stopDrone();
    } else {
      this.startDrone();
    }

    return !this.isMuted;
  }

  public getIsPlaying(): boolean {
    return !this.isMuted;
  }

  private startDrone() {
    if (!this.ctx) return;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gainNode.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);
    this.gainNode.connect(this.ctx.destination);

    // Deep cosmic fundamental (55Hz - A1)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);
    this.osc1.connect(this.gainNode);
    this.osc1.start();

    // Harmonics (110Hz - A2 with slow vibrato)
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'sine';
    this.osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime);
    this.osc2.connect(this.gainNode);
    this.osc2.start();
  }

  private stopDrone() {
    if (!this.ctx || !this.gainNode) return;
    try {
      this.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1);
      setTimeout(() => {
        this.osc1?.stop();
        this.osc2?.stop();
        this.osc1?.disconnect();
        this.osc2?.disconnect();
      }, 1000);
    } catch {
      // Ignored
    }
  }

  public playPulse(frequency: number = 440) {
    if (this.isMuted || !this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.35);
    } catch {
      // Ignored
    }
  }

  /**
   * Synthesize cinematic Hyperspace Warp Jump audio sequence:
   * 1. Sub-bass engine spool-up & rising resonant frequency (0 - 1.4s)
   * 2. High-speed warp whoosh (0.8 - 1.8s)
   * 3. Deep harmonic arrival chord on orbital insertion (1.8 - 2.5s)
   */
  public playWarpJump() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    try {
      const now = this.ctx.currentTime;

      // 1. Engine Spool-up Riser (Low sub-bass sweeping to high power)
      const oscRiser = this.ctx.createOscillator();
      const riserGain = this.ctx.createGain();
      oscRiser.type = 'sawtooth';

      // Sweep from 55Hz (A1) up to 340Hz
      oscRiser.frequency.setValueAtTime(55, now);
      oscRiser.frequency.exponentialRampToValueAtTime(340, now + 1.4);

      // Filter to keep it deep and cinematic
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 1.4);

      riserGain.gain.setValueAtTime(0.001, now);
      riserGain.gain.exponentialRampToValueAtTime(0.05, now + 1.0);
      riserGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

      oscRiser.connect(filter);
      filter.connect(riserGain);
      riserGain.connect(this.ctx.destination);

      oscRiser.start(now);
      oscRiser.stop(now + 1.6);

      // 2. Orbital Insertion Arrival Impact at 1.7s
      const oscImpact = this.ctx.createOscillator();
      const impactGain = this.ctx.createGain();
      oscImpact.type = 'sine';
      oscImpact.frequency.setValueAtTime(110, now + 1.7);
      oscImpact.frequency.exponentialRampToValueAtTime(45, now + 2.5);

      impactGain.gain.setValueAtTime(0.0001, now + 1.69);
      impactGain.gain.exponentialRampToValueAtTime(0.08, now + 1.75);
      impactGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.6);

      oscImpact.connect(impactGain);
      impactGain.connect(this.ctx.destination);

      oscImpact.start(now + 1.7);
      oscImpact.stop(now + 2.7);
    } catch {
      // Audio fallback silent
    }
  }

  /**
   * Reverse Warp Disengagement on Exit Void
   */
  public playWarpExit() {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(65, now + 1.2);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Audio fallback silent
    }
  }
}

export const voidAudio = new VoidAudioEngine();
