/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { AnyAction } from 'ui/embeddable/actions/action';
import { AnyContainer } from 'ui/embeddable/containers';
import { Trigger } from 'ui/embeddable/triggers';
import { AnyEmbeddable } from '../embeddables';
import { ActionSavedObject } from './action_saved_object';

export interface CreateOptions {
  embeddable: AnyEmbeddable;
  container: AnyContainer;
}

export abstract class ActionFactory {
  public readonly id: string;
  public readonly title: string;

  constructor({ id, title }: { id: string; title: string }) {
    this.id = id;
    this.title = title;
  }

  public abstract isCompatible({
    embeddable,
    container,
  }: {
    embeddable: AnyEmbeddable;
    container: AnyContainer;
  }): Promise<boolean>;

  public allowAddingToTrigger(trigger: Trigger) {
    return true;
  }

  public abstract renderEditor(
    dom: React.ReactNode,
    configuration: string,
    onChange: (config: string) => void
  ): void;

  public abstract fromSavedObject(actionSavedObject: ActionSavedObject): AnyAction;

  public abstract async createNew(): Promise<AnyAction | undefined>;
}
